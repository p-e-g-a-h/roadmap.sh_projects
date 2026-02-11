const express = require("express");
const db = require("../database/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { title, amount, category } = req.body;

  if (title && amount && category) {
    try {
      const result = await db.action({
        name: "create",
        newExpense: {
          title: title,
          amount: amount,
          category: category,
          user_id: req.user.id,
        },
      });

      if (result.affectedRows) {
        return res
          .status(201)
          .json({ message: "expense created successfully" });
      }
    } catch (error) {
      return next(error);
    }
  }

  res.sendStatus(400);
});

router.put("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id;
  const { title, amount, category } = req.body;

  if (id && title && amount && category) {
    try {
      const result = await db.action({
        name: "update",
        expense: {
          id: id,
          user_id: req.user.id,
          title: title,
          amount: amount,
          category: category,
        },
      });

      if (result.affectedRows) {
        return res
          .status(200)
          .json({ message: "expense updated successfully" });
      }

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
        expense: { id: id, user_id: req.user.id },
      });

      if (result.affectedRows) {
        return res.sendStatus(204);
      }

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
        expense: { id: id, user_id: req.user.id },
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
  const { filter, from, to } = req.query;

  const endDate =
    filter === "custom" && from && to
      ? new Date(new Date(to).setHours(23, 59, 59, 999))
      : new Date();

  const startDate =
    filter === "custom" && from && to
      ? new Date(from)
      : filter === "past_week"
        ? new Date(Date.now() - 604800000)
        : filter === "past_month"
          ? new Date(Date.now() - 2592000000)
          : filter === "last_3_months"
            ? new Date(Date.now() - 7776000000)
            : new Date(0);

  try {
    const result = await db.action({
      name: "getAll",
      expense: {
        user_id: req.user.id,
        startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
      },
    });

    if (result) return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
