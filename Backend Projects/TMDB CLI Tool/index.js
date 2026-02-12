#!/usr/bin/env node
require("dotenv").config();
const { program } = require("commander");

const url = (type) => `https://api.themoviedb.org/3/movie/${type}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
  },
};

const fetchData = async (type) => {
  const response = await fetch(url(type), options);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};

const types = {
  playing: "now_playing",
  popular: "popular",
  top: "top_rated",
  upcoming: "upcoming",
};

program.requiredOption("--type <string>").action(async (options) => {
  const { type } = options;

  if (!(type in types)) {
    return console.log(
      "error: type should be playing, popular, top or upcoming.",
    );
  }

  try {
    const data = await fetchData(types[type]);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

program.parse();
