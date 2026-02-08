const { MongoClient } = require("mongodb");

let database = null;

const connectDB = async () => {
  if (!database) {
    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    database = client.db("todo_list");
  }
};

const action = async (args) => {
  try {
    await connectDB();
    const users = database.collection("users");
    const todos = database.collection("todos");
    let result;

    switch (args.name) {
      case "register":
        result = await users.insertOne(args.user);
        break;
      case "login":
        result = await users.findOne({ email: args.email });
        break;
      case "create":
        result = await todos.insertOne(args.todo);
        break;
      case "update":
        result = await todos.findOneAndUpdate(
          args.filter,
          { $set: args.todo },
          { returnDocument: "after" },
        );
        break;
      case "delete":
        result = await todos.deleteOne(args.filter);
        break;
      case "getOne":
        result = await todos.findOne(args.filter);
        break;
      case "getAll":
        result = await todos.find(args.filter).toArray();
        break;
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { action, connectDB };
