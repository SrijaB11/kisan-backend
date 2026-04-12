let express = require("express");
const CartModel = require("../models/CartModel");
const { customerAuth } = require("../middlewares/auth");
const ProductModel = require("../models/ProductModel");
let router = express.Router();

// router.post("/add", customerAuth, async (req, res) => {
//   let data = req.body;
//   let product = await ProductModel.findOne({ _id: data.productId });
//   if (product.quantity == 0) {
//     res.send("outof stock");
//     return;
//   }

//   data.userId = req.userId;
//   let cartData = await CartModel.find(data);
//   console.log(cartData);
//   if (cartData.length > 0) {
//     res.send("already added");
//     return;
//   }
//   data.count = 1;

//   let result = await CartModel.create(data);
//   res.json(result);
// });

router.post("/add", customerAuth, async (req, res) => {
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
});
router.get("/", customerAuth, async (req, res) => {
  let result = await CartModel.find({ userId: req.userId }).populate(
    "productId",
  );
  res.json(result);
});
router.post("/count", async (req, res) => {
  let data = req.body;
  let result = await CartModel.findOne({ _id: data.id });
  let count = result.count;

  if (data.operation == "dec") {
    count--;
  } else {
    count++;
  }
  await CartModel.findOneAndUpdate({ _id: data.id }, { count: count });
  res.send("done");
});

router.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await CartModel.deleteOne({ _id: id });
  res.send("deleted");
});

module.exports = router;
