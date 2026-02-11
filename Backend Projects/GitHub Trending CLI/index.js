#!/usr/bin/env node
const { program } = require("commander");

program
  .option("--duration <string>")
  .option("--limit <number>")
  .action(async (options) => {
    const { duration, limit } = options;
    const dates = { day: 1, week: 7, month: 30, year: 365 };

    if (duration && !(duration in dates)) {
      return console.error({
        message: "invalid duration. (day, week, month, year, default: week)",
      });
    }

    if (limit && isNaN(limit)) {
      return console.error({
        message: "invalid limit. enter integer.",
      });
    }

    const date = new Date(Date.now() - (dates[duration] || 7) * 864e5)
      .toISOString()
      .split("T")[0];

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=${limit ? limit : 10}`,
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      const formatedItems = result.items.map((item) => {
        return {
          repo_name: item.full_name,
          description: item.description,
          language: item.language,
          stars: item.stargazers_count,
        };
      });

      console.log(formatedItems);
    } catch (error) {
      console.error(error);
    }
  });

program.parse();
