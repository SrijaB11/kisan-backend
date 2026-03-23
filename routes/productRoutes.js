let express = require("express");
const ProductModel = require("../models/ProductModel");

let router = express.Router();

router.post("/add", async (req, res) => {
  let data = req.body;
  try {
    let result = await ProductModel.create(data);

    res.status(201).json({
      message: "successfully stored",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "server error",
    });
  }
});
router.get("/getAll", async (req, res) => {
  let result = await ProductModel.find();
  res.status(200).json(result);
});
router.put("/edit/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let data = req.body;

  let result = await ProductModel.findOneAndUpdate({ _id: id }, data);
  res.status(200).json({
    message: "updated",
  });
});
router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let result = await ProductModel.findOneAndDelete({ _id: id });
  res.status(200).json(result);
});
module.exports = router;
