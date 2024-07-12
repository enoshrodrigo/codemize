// controllers/authController.js
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { db } = require("../models/db");
const { generateAccessToken } = require("../utils/jwtUtils");
 
const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("logim");
  db.query("SELECT * FROM  team_assign WHERE email = ? AND password = ?", [email, md5(password)], async (err, status) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (status.length > 0 && status != undefined) {
      const token = generateAccessToken({ id: status[0].id, email: status[0].email, name: status[0].team_name });
      res.setHeader("Authorization", `Bearer ${token}`);
      console.log("Token sent in headers");
      res.status(200).json({ message: "Token sent in headers" });
    } else {
      res.status(404).json("User name or password incorrect");
    }
  });
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "theKey", (err, user) => {
      if (err) {
        console.log("Token is not valid");
        return res.status(401).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("Authorization header is required");
  }
};

 
module.exports = { verify ,loginUser};
