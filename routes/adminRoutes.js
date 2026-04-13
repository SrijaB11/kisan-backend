const express = require("express");
const { adminAuth } = require("../middlewares/auth");
const { getAllCustomers } = require("../controllers/customerController");

const router = express.Router();

router.get("/allCustomers", adminAuth, getAllCustomers);

module.exports = router;
