// @ts-ignore
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  if (token) {
    try {
      const verified = jwt.verify(token, process.env.JWT_KEY);
      req.user = verified;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  res.status(401).json({ message: "Unauthorized: No token provided" });
};

module.exports = { verifyToken };
