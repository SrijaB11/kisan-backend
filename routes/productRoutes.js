const express = require("express");

const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/getAll", getAllProducts);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
