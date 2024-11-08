// routes/questionRoutes.js
const express = require("express");
const router = express.Router(); 
const { verify } = require("../controllers/authController");
const { buzzerClick, buzzerReset } = require("../controllers/buzzerControllers");

router.get("/buzzer/start" );
router.get("/buzzer/click",buzzerClick);
router.get("/buzzer/reset", buzzerReset);

module.exports = router;