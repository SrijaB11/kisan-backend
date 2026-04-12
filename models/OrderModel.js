const mongoose = require("mongoose");

let ordersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      count: Number,
    },
  ],
  count: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  name: String,
  phoneNo: Number,
  pincode: Number,
  address: String,
  isOrderAccept: Boolean,
  price: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

let OrdersModel = mongoose.model("Orders", ordersSchema);
module.exports = OrdersModel;
