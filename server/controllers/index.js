const express = require("express");
const router = express.Router();
const getRecords = require("./getRecords");

router.get("/records", getRecords);

module.exports = router;
