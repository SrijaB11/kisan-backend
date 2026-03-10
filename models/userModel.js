const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  pasword: String,
  role: String,
});
let userModel = new mongoose.model("customer", userSchema);

module.exports = userModel;
