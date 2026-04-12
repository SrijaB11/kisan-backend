const express = require("express");
const razorpay = require("../config/razorpay");
const router = express.Router();

// create order API
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
