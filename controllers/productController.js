const ProductModel = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
    let data = req.body;

    await ProductModel.create(data);

    res.status(201).json({
      message: "successfully stored",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let result = await ProductModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    let result = await ProductModel.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      message: "updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;

    let result = await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "deleted",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
