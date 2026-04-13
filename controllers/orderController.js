const OrdersModel = require("../models/OrderModel");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");

exports.saveOrder = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.userId;

    await OrdersModel.create(data);

    await CartModel.deleteMany({ userId: req.userId });

    for (let item of data.products) {
      await ProductModel.findByIdAndUpdate(item.productId._id, {
        $inc: { quantity: -item.count },
      });
    }

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    let result = await OrdersModel.find({ userId: req.userId }).populate(
      "products.productId",
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    let result = await OrdersModel.find().populate("products.productId");
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    let data = req.body;

    let result = await OrdersModel.findByIdAndUpdate(
      req.params.id,
      { ...data },
      { new: true },
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
