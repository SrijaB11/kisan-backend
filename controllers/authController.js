const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    let data = req.body;
    data.role = "customer";

    let existingUser = await userModel.findOne({ email: data.email });

    if (existingUser) {
      return res.status(400).json({
        message: "email already exists!!",
      });
    }

    await userModel.create(data);

    res.status(201).json({
      message: "Successfully registered",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    let data = req.body;

    let user = await userModel.findOne({
      email: data.email,
      password: data.password,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid details",
      });
    }

    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login success!!!",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later",
    });
  }
};
