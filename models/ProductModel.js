const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  unit: String,
  quantity: Number,
  isOrganic: Boolean,
});

let ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
