let express = require("express");
let cors = require("cors");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
require("dotenv").config();
let app = express();
connectDB();

app.use(cors());
app.use(express.json()); //middleware
app.use("/customer", customerRoutes);
app.get("/", (req, res) => {
  res.send("home!!!");
});
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server is running in prt 5000");
});
