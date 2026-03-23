const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_ATLAS_URL)
    .then(() => {
      console.log(" database connected");
    })
    .catch(() => {
      console.log("error");
    });
}

module.exports = connectDB;
