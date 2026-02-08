const { MongoClient, BSONType } = require("mongodb");

const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "name", "email", "password"],
    properties: {
      _id: { bsonType: "string" },
      name: { bsonType: "string" },
      email: { bsonType: "string", pattern: "^.+@.+$" },
      password: { bsonType: "string" },
    },
  },
};

const todoSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "userId", "title", "description", "completed"],
    properties: {
      _id: { bsonType: "string" },
      userId: { bsonType: "string" },
      title: { bsonType: "string" },
      description: { bsonType: "string" },
      completed: { bsonType: "bool" },
    },
  },
};

const initDatabase = async () => {
  const client = new MongoClient(process.env.DB_URI);
  try {
    await client.connect();
    const database = client.db("todo_list");

    await database.createCollection("users", { validator: userSchema });
    await database.createCollection("todos", { validator: todoSchema });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = initDatabase;
