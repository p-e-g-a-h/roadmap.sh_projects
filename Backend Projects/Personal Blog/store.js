const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const dirPath = path.join(__dirname, "articles");

const getAllData = async () => {
  try {
    const files = await fs.readdir(dirPath);
    const data = [];
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const item = await fs.readFile(filePath, "utf-8");
      data.push(JSON.parse(item));
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getById = async (id) => {
  try {
    const filePath = path.join(dirPath, `${id}.json`);
    const item = await fs.readFile(filePath, "utf-8");
    return JSON.parse(item);
  } catch (error) {
    console.log(error);
  }
};

const add = async (title, content) => {
  try {
    const id = uuid();
    const item = {
      id: id,
      title: title,
      content: content,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
    const filePath = path.join(dirPath, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(item, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const remove = async (id) => {
  try {
    const filePath = path.join(dirPath, `${id}.json`);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(error);
  }
};

const edit = async (id, title, content) => {
  try {
    const filePath = path.join(dirPath, `${id}.json`);
    const item = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const updatedItem = {
      ...item,
      title: title,
      content: content,
    };
    await fs.writeFile(filePath, JSON.stringify(updatedItem, null, 2));
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllData, getById, add, remove, edit };
