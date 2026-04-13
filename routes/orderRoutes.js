const express = require("express");
const { customerAuth, adminAuth } = require("../middlewares/auth");

const {
  saveOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/save", customerAuth, saveOrder);
router.get("/", customerAuth, getUserOrders);
router.get("/getAll", adminAuth, getAllOrders);
router.put("/update/:id", adminAuth, updateOrder);

module.exports = router;
