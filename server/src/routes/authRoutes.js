// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
 
router.post("/user", loginUser);
module.exports = router;
