#!/usr/bin/env node

const fetchAndShowData = async (username) => {
  if (!username) {
    console.error("Usage: github-activity <username>");
    process.exit(1);
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/events`,
  ).catch((err) => console.log("API failed. please try again later."));
  const data = await response.json();

  if (!response.ok) {
    console.log("API failed. please try again later.");
    return;
  }

  const newData = [];
  let index;
  data.forEach((event) => {
    index = newData.findIndex(
      (item) => item.type == event.type && item.repo == event.repo.name,
    );
    if (index == -1) {
      newData.push({
        type: event.type,
        repo: event.repo.name,
        count: 1,
        action: event.payload.action,
        ref_type: event.payload.ref_type,
      });
    } else {
      newData[index].count++;
    }
  });

  console.log("output:");
  newData.forEach(({ type, repo, count, action, ref_type }) => {
    let message;
    switch (type) {
      case "PushEvent":
        message = `- pushed ${count} commits to ${repo}`;
        break;
      case "WatchEvent":
        message = `- ${action == "started" ? "starred" : action} ${count} times at ${repo}`;
        break;
      case "IssuesEvent":
        message = `- ${action} ${count} issues at ${repo}`;
        break;
      case "IssueCommentEvent":
        message = `- commented on ${count} issues at ${repo}`;
        break;
      case "CreateEvent":
        message = `- created ${count} new ${ref_type} in ${repo}`;
        break;
      default:
        message = `- ${type} at ${repo}`;
    }
    console.log(message);
  });
};

fetchAndShowData(process.argv[2]);
