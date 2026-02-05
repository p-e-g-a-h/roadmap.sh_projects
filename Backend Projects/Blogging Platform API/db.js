const { MongoClient } = require("mongodb");

const action = async (args) => {
  const client = new MongoClient(process.env.DB_URI);
  try {
    const database = client.db("blogging_Platform");
    const collection = database.collection("posts");
    let result;

    switch (args.name) {
      case "create":
        await collection.insertOne(args.doc);
        break;
      case "update":
        result = await collection.findOneAndUpdate(
          { _id: args.id },
          { $set: { ...args.doc } },
          { returnDocument: "after" },
        );
        break;
      case "delete":
        result = await collection.deleteOne({ _id: args.id });
        break;
      case "getOne":
        result = await collection.findOne({ _id: args.id });
        break;
      case "getAll":
        result = await collection.find(args.filter).toArray();
        break;
    }

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = { action };
