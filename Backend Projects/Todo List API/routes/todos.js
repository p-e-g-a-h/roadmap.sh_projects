const express = require("express");
const { v4: uuid } = require("uuid");
const db = require("../database/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { title, description, completed } = req.body;

  if (title && description && completed !== undefined) {
    const newTodo = {
      title: title,
      description: description,
      completed: completed,
      userId: req.user.id,
      _id: uuid(),
    };
    try {
      const result = await db.action({
        name: "create",
        todo: newTodo,
      });

      if (result) return res.status(201).json(newTodo);
    } catch (error) {
      return next(error);
    }
  }

  res.sendStatus(400);
});

router.put("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;

  if (id && title && description && completed !== undefined) {
    try {
      const result = await db.action({
        name: "update",
        filter: { _id: id, userId: req.user.id },
        todo: { title: title, description: description, completed: completed },
      });

      if (result) return res.status(200).json(result);
      return res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }

  res.sendStatus(400);
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  if (id) {
    try {
      const result = await db.action({
        name: "delete",
        filter: { _id: id, userId: req.user.id },
      });

      if (result.deletedCount) return res.sendStatus(204);
      return res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }

  res.sendStatus(400);
});

router.get("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;

  if (id) {
    try {
      const result = await db.action({
        name: "getOne",
        filter: { _id: id, userId: req.user.id },
      });

      if (result) return res.status(200).json(result);
      return res.sendStatus(404);
    } catch (error) {
      return next(error);
    }
  }

  res.sendStatus(400);
});

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const result = await db.action({
      name: "getAll",
      filter: { ...req.query, userId: req.user.id },
    });

    if (result) return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
