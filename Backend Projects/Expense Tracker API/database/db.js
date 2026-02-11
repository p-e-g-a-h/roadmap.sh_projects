const pool = require("./connect");

const action = async (args) => {
  let result;

  switch (args.name) {
    case "register":
      {
        const [rows] = await pool.query(
          `INSERT INTO user
          (name, email, password)
          VALUES (?, ?, ?)`,
          [args.newUser.name, args.newUser.email, args.newUser.password],
        );

        result = rows;
      }
      break;
    case "login":
      {
        const [rows] = await pool.query(
          `SELECT BIN_TO_UUID(id) AS id, password FROM user WHERE email=?`,
          [args.email],
        );

        result = rows[0];
      }
      break;
    case "create":
      {
        const [rows] = await pool.query(
          `INSERT INTO expense
          (title, amount, category, user_id)
          VALUES (?, ?, ?, UUID_TO_BIN(?))`,
          [
            args.newExpense.title,
            args.newExpense.amount,
            args.newExpense.category,
            args.newExpense.user_id,
          ],
        );

        result = rows;
      }
      break;
    case "update":
      {
        const [rows] = await pool.query(
          `UPDATE expense
          SET title = ?, amount = ?, category = ?
          WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)`,
          [
            args.expense.title,
            args.expense.amount,
            args.expense.category,
            args.expense.id,
            args.expense.user_id,
          ],
        );

        result = rows;
      }
      break;
    case "delete":
      {
        const [rows] = await pool.query(
          `DELETE FROM expense
          WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)`,
          [args.expense.id, args.expense.user_id],
        );

        result = rows;
      }
      break;
    case "getOne":
      {
        const [rows] = await pool.query(
          `SELECT BIN_TO_UUID(id) AS id, BIN_TO_UUID(user_id) AS user_id, title, amount, category, created_at
          FROM expense
          WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)`,
          [args.expense.id, args.expense.user_id],
        );

        result = rows[0];
      }
      break;
    case "getAll":
      {
        const [rows] = await pool.query(
          `SELECT BIN_TO_UUID(id) AS id, BIN_TO_UUID(user_id) AS user_id, title, amount, category, created_at
          FROM expense
          WHERE user_id = UUID_TO_BIN(?)
          AND created_at BETWEEN ? AND ?
          ORDER BY created_at DESC`,
          [args.expense.user_id, args.expense.startDate, args.expense.endDate],
        );

        result = rows;
      }
      break;
  }

  return result;
};

module.exports = { action };
