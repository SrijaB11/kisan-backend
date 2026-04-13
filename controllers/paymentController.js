const razorpay = require("../config/razorpay");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // validation
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
      });
    }

    const options = {
      amount: amount * 100, // paisa
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("RAZORPAY ERROR:", error);
    res.status(500).json({
      message: "Payment order creation failed",
    });
  }
};
