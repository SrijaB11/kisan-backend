const UserModel = require("../models/UserModel");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({ role: "customer" });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
