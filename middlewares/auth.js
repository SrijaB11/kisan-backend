let jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

async function adminAuth(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let result = await UserModel.findOne({ _id: decoded.id });
    console.log(decoded);
    console.log(result);

    if (!result || decoded.role != "admin") {
      res.status(401).json({
        message: "not authorized!!",
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      message: "token invalid or expired",
    });
    return;
  }
}
async function customerAuth(req, res, next) {
  try {
    // console.log(req);
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    let result = await UserModel.findOne({ _id: decoded.id });
    // console.log(result);

    if (!result || decoded.role != "customer") {
      res.status(401).json({
        message: "not authorized!!",
      });
      return;
    }
    // console.log(decoded.id);

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      message: "token invalid or expired",
    });
    return;
  }
}
module.exports = { adminAuth, customerAuth };
