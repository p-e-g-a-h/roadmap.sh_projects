const mysql = require("mysql2/promise");

const pool = mysql.createPool(process.env.DB_URL);

(async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

module.exports = pool;
