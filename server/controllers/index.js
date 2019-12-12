const express = require("express");
const router = express.Router();
const getRecords = require("./getRecords");

router.get("/records/:customerName", getRecords);

module.exports = router;
