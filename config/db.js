// require("dotenv").config();
// let mongoose = require("mongoose");
// console.log("ENV CHECK:", process.env.MONGO_ATLAS_URL);

// function database() {
//   mongoose
//     .connect(process.env.MONGO_ATLAS_URL)

//     .then(() => {
//       console.log("database connected");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }
// module.exports = database;

const mongoose = require("mongoose");
//require("dotenv").config();

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
