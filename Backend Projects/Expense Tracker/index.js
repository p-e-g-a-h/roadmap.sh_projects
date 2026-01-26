#!/usr/bin/env node
const { v4: uuid } = require("uuid");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");
let list;

// get list
if (!fs.existsSync(dataPath)) list = [];
else {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    list = data;
  } catch (error) {
    console.error(error);
  }
}

program
  .command("add")
  .requiredOption("--description <string>")
  .requiredOption("--amount <number>")
  .action((options) => {
    list.push({
      ...options,
      id: uuid(),
      date: new Date().toISOString().slice(0, 10),
    });
    console.log(
      `# Expense added successfully (ID: ${list[list.length - 1].id})`,
    );
  });

program
  .command("update")
  .requiredOption("--id <string>")
  .requiredOption("--amount <number>")
  .action((options) => {
    const index = list.findIndex((item) => item.id == options.id);
    if (index !== -1) {
      list[index] = { ...list[index], ...options };
      console.log("# Expense Updated successfully");
    } else {
      console.log("Not found expense!");
    }
  });

program
  .command("delete")
  .requiredOption("--id <string>")
  .action((options) => {
    const index = list.findIndex((item) => item.id == options.id);
    if (index !== -1) {
      list.splice(index, 1);
      console.log("# Expense deleted successfully");
    } else {
      console.log("Not found expense!");
    }
  });

program.command("list").action(() => {
  console.log(
    "# ID                                     Date         Description   Amount",
  );
  list.forEach((item) => {
    console.log(
      `# ${item.id}   ${item.date}   ${item.description}          ${item.amount}$`,
    );
  });
});

program
  .command("summary")
  .option("--month <number>")
  .action((options) => {
    let newList;
    if (options.month) {
      const month =
        options.month - 10 >= 0 ? `${options.month}` : `0${options.month}`;
      newList = list.filter(
        (item) => item.date[5] == month[0] && item.date[6] == month[1],
      );
    } else {
      newList = [...list];
    }
    const total = newList.reduce(
      (result, item) => result + Number(item.amount),
      0,
    );

    console.log(`# Total expenses: ${total}`);
  });

program.parse();

// write on file
try {
  fs.writeFileSync(dataPath, JSON.stringify(list));
} catch (error) {
  console.error(error);
}
