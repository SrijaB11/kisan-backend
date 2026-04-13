const express = require("express");
const { customerAuth } = require("../middlewares/auth");

const {
  addToCart,
  getCart,
  updateCount,
  deleteCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", customerAuth, addToCart);
router.get("/", customerAuth, getCart);
router.post("/count", updateCount);
router.delete("/delete/:id", deleteCartItem);

module.exports = router;
