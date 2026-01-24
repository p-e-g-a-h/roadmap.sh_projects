#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const dataPath = path.join(__dirname, "data.json");
const action = process.argv[2];

const getIndexAndData = (id = null) => {
  if (!fs.existsSync(dataPath)) return { index: -1, data: [] };
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const index = id ? data.findIndex((item) => item.id == id) : -1;
  return { data, index };
};

const writeData = (data, message) => {
  fs.writeFileSync(dataPath, JSON.stringify(data));
  console.log(message);
};

switch (action) {
  case "add":
    {
      const task = {
        id: uuid(),
        description: process.argv[3],
        status: "todo",
        createdAt: new Date().toISOString(),
      };
      try {
        if (!fs.existsSync(dataPath)) {
          writeData([task], `Task added successfully (ID: ${task.id})`);
        } else {
          const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
          data.push(task);
          writeData(data, `Task added successfully (ID: ${task.id})`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;

  case "update":
    {
      const id = process.argv[3];
      const description = process.argv[4];
      try {
        const { index, data } = getIndexAndData(id);
        if (index !== -1) {
          data[index].description = description;
          data[index].updatedAt = new Date().toISOString();
          writeData(data, `Task updated successfully (ID: ${id})`);
        } else {
          console.log("not found this task.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;

  case "delete":
    {
      const id = process.argv[3];
      try {
        const { index, data } = getIndexAndData(id);
        if (index !== -1) {
          data.splice(index, 1);
          writeData(data, `Task deleted successfully (ID: ${id})`);
        } else {
          console.log("not found this task.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;
  case "mark-in-progress":
    {
      const id = process.argv[3];
      try {
        const { index, data } = getIndexAndData(id);
        if (index !== -1) {
          data[index].status = "in-progress";
          data[index].updatedAt = new Date().toISOString();
          writeData(
            data,
            `Marked task to in progress successfully (ID: ${id})`,
          );
        } else {
          console.log("not found this task.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;
  case "mark-done":
    {
      const id = process.argv[3];
      try {
        const { index, data } = getIndexAndData(id);
        if (index !== -1) {
          data[index].status = "done";
          data[index].updatedAt = new Date().toISOString();
          writeData(data, `Marked task to done successfully (ID: ${id})`);
        } else {
          console.log("not found this task.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;
  case "list":
    {
      try {
        const { data } = getIndexAndData();
        if (data.length) {
          const secondAction = process.argv[3];
          if (secondAction == "done") {
            console.table(data.filter((item) => item.status == "done"));
          } else if (secondAction == "todo") {
            console.table(data.filter((item) => item.status == "todo"));
          } else if (secondAction == "in-progress") {
            console.table(data.filter((item) => item.status == "in-progress"));
          } else {
            console.table(data);
          }
        } else {
          console.log("not found any task.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    break;
}
