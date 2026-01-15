const select = document.querySelector("select");
const message = document.querySelector("#message");

select.addEventListener("change", async (e) => {
  const lang = e.target.value;
  if (lang) {
    message.textContent = "Loading, please wait...";
    await fetchData(lang);
  }
});

const fetchData = async (lang) => {
  const randomPage = Math.floor(Math.random() * 1000) + 1;
  const url = `https://api.github.com/search/repositories?q=topic:${lang}&per_page=1&page=${randomPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      message.textContent = "Error fetching repository";
    }

    const data = await response.json();
    const {
      name,
      description,
      stargazers_count,
      forks_count,
      open_issues_count,
    } = data.items[0];

    message.textContent = "";
    createP("Name: " + name);
    createP(
      "Description: " + description.split(" ").slice(0, 10).join(" ") + " ..."
    );
    createP(
      `${stargazers_count} stars | ${forks_count} forks | ${open_issues_count} open issues`
    );

    console.log(data);
  } catch (error) {
    message.textContent = "Error fetching repository";
  }
};

const createP = (text) => {
  const p = document.createElement("p");
  p.textContent = text;
  message.appendChild(p);
};
