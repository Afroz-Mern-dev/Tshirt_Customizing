const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { createOrder, getUserOrders } = require("../Controllers/orderController");

router.post("/create", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);

module.exports = router;
