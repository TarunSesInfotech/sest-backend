const express = require("express");
const router = express.Router();

const { sendContactMail } = require("../controllers/contactController.js");

router.post("/contact", sendContactMail);

module.exports = router;

