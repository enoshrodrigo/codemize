// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { verify } = require("../controllers/authController");

router.post("/question/socket", questionController.socketFunction);
router.post("/question/refresh", verify, questionController.refreshQuestion);

module.exports = router;