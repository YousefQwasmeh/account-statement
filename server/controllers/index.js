const express = require("express");
const router = express.Router();
const getRecords = require("./getRecords");
const getAllCustomers = require("./getAllCustomers");

router.get("/records/:customerName", getRecords);
router.get("/getAllCustomers", getAllCustomers);

module.exports = router;
