const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");

exports.addToCart = async (req, res) => {
  try {
    let data = req.body;

    if (!data.productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    let product = await ProductModel.findById(data.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity === 0) {
      return res.json({ message: "outof stock" });
    }

    data.userId = req.userId;

    let cartData = await CartModel.find({
      userId: req.userId,
      productId: data.productId,
    });

    if (cartData.length > 0) {
      return res.json({ message: "already added" });
    }

    data.count = 1;

    let result = await CartModel.create(data);
    res.json(result);
  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    let result = await CartModel.find({ userId: req.userId }).populate(
      "productId",
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCount = async (req, res) => {
  try {
    let data = req.body;

    let result = await CartModel.findById(data.id);
    if (!result) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    let count = result.count;

    if (data.operation === "dec") {
      count = Math.max(1, count - 1); // prevent 0 or negative
    } else {
      count++;
    }

    await CartModel.findByIdAndUpdate(data.id, { count });

    res.json({ message: "updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
