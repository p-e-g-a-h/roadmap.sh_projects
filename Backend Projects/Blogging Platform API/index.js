const express = require("express");
const { v4: uuid } = require("uuid");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (title && content && category && tags) {
    const newItem = {
      ...req.body,
      _id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.action({ name: "create", doc: newItem });
    return res.status(201).json(newItem);
  }
  res.sendStatus(400);
});

app.put("/posts/:id", async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (title || content || category || tags) {
    const result = await db.action({
      name: "update",
      id: req.params.id,
      doc: {
        ...req.body,
        updatedAt: new Date(),
      },
    });
    if (result) return res.status(200).json(result);
    return res.sendStatus(404);
  }
  res.sendStatus(400);
});

app.delete("/posts/:id", async (req, res) => {
  const result = await db.action({ name: "delete", id: req.params.id });
  if (result.deletedCount) return res.sendStatus(204);
  res.sendStatus(404);
});

app.get("/posts/:id", async (req, res) => {
  const result = await db.action({ name: "getOne", id: req.params.id });
  if (result) return res.status(200).json(result);
  res.sendStatus(404);
});

app.get("/posts", async (req, res) => {
  const result = await db.action({ name: "getAll", filter: { ...req.query } });
  res.status(200).json(result);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
