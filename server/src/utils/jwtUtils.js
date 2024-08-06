// utils/jwtUtils.js
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, "theKey", { expiresIn: "2000s" });
};

module.exports = { generateAccessToken };
