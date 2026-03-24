const express = require("express");
const router = express.Router();

const { sendOrderMail } = require("../controllers/orderController");

router.post("/order", sendOrderMail);

module.exports = router;