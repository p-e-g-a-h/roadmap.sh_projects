const express = require("express");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/db");

const router = express.Router();

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1h" });
};

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const newUser = {
      name: name,
      email: email,
      _id: uuid(),
      password: await bcrypt.hash(password, 10),
    };

    try {
      const result = await db.action({
        name: "register",
        user: newUser,
      });

      if (result) {
        return res
          .status(201)
          .json({ token: createToken({ id: newUser._id, email: email }) });
      }

      return res.sendStatus(500);
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
      const result = await db.action({ name: "login", email: email });

      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);

        if (isMatch) {
          return res.status(200).json({
            token: createToken({ id: result._id, email: email }),
          });
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
