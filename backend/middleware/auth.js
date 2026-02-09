const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secretkey";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");

  const decoded = jwt.verify(token, SECRET);
  req.userId = decoded.id;
  next();
};
