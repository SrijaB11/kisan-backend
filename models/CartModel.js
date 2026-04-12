const mongoose = require("mongoose");

let CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  count: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

let CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
