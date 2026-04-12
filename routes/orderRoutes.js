let express = require("express");
const { customerAuth, adminAuth } = require("../middlewares/auth");
const OrdersModel = require("../models/orderModel");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
let router = express.Router();

router.post("/save", customerAuth, async (req, res) => {
  let data = req.body;
  data.userId = req.userId;
  // console.log(data);
  await OrdersModel.create(data);
  await CartModel.deleteMany({ userId: req.userId });
  data.products.map(async (item, id) => {
    // console.log(item.count);
    await ProductModel.findOneAndUpdate(
      { _id: item.productId._id },
      { $inc: { quantity: -item.count } },
      { new: true },
    );
  });
  res.send("done");
});

router.get("/", customerAuth, async (req, res) => {
  let userId = req.userId;
  let result = await OrdersModel.find({ userId: userId }).populate(
    "products.productId",
  );
  res.json(result);
});

router.get("/getAll", adminAuth, async (req, res) => {
  let result = await OrdersModel.find().populate("products.productId");
  res.json(result);
});
router.put("/update/:id", adminAuth, async (req, res) => {
  // console.log("hii")
  let data = req.body; // isAccepted:true
  console.log(data);

  let result = await OrdersModel.findOneAndUpdate(
    { _id: req.params.id },
    { ...data },
  );
  console.log(result);
  res.json(result);
});

module.exports = router;
