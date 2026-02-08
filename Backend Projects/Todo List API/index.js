const express = require("express");
const authRouter = require("./routes/auth");
const todosRouter = require("./routes/todos");
const { connectDB } = require("./database/db");
const initDatabase = require("./database/schema");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todosRouter);

app.use((err, req, res, next) => {
  console.error("Error Log:", err);

  if (err.code === 121) {
    return res.status(400).json({
      message: "Validation Error: Data doesn't match the schema rules.",
    });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

(async () => {
  try {
    await initDatabase();
    await connectDB();
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
