const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/db");

const router = express.Router();

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1h" });
};

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name && email && password) {
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    try {
      const result = await db.action({
        name: "register",
        newUser: {
          name: name,
          email: email,
          password: await bcrypt.hash(password, 10),
        },
      });

      if (result.affectedRows) {
        return res.status(201).json({ message: "user registerd successfully" });
      }
    } catch (error) {
      return next(error);
    }
  }
  res.sendStatus(400);
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const result = await db.action({
        name: "login",
        email: email,
      });

      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
          return res
            .status(200)
            .json({ token: createToken({ id: result.id }) });
        }
      }

      return res.sendStatus(401);
    } catch (error) {
      return next(error);
    }
  }
  res.sendStatus(400);
});

module.exports = router;
