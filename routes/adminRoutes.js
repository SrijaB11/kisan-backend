let express = require("express");
const { adminAuth } = require("../middlewares/auth");
const UserModel = require("../models/UserModel");

let router = express.Router();

router.get("/allCustomers", adminAuth, async (req, res) => {
  try {
    let customers = await UserModel.find({ role: "customer" });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
});

module.exports = router;
