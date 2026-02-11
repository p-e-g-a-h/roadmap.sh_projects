require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const expenseRouter = require("./routes/expense");
const initDB = require("./database/initDB");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/expense", expenseRouter);

app.use((err, req, res, next) => {
  console.error("Error Log:", err);

  // 1265: Data truncated (Bad ENUM value)
  // 1366: Incorrect value (Type mismatch)
  if (err.errno === 1265 || err.errno === 1366) {
    return res.status(400).json({
      message: "Validation Error: Invalid category or data format.",
    });
  }

  // 1062: Duplicate entry (e.g., same email)
  if (err.errno === 1062) {
    return res
      .status(409)
      .json({ message: "Conflict: Duplicate entry found." });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

(async () => {
  await initDB();
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
})();
