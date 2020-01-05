const express = require("express");
const router = express.Router();
const getRecords = require("./getRecords");
const getAllCustomers = require("./getAllCustomers");
const updateNote = require("./updateNote");

router.get("/records/:customerName", getRecords);
router.get("/getAllCustomers", getAllCustomers);
router.post("/setNote", updateNote);

module.exports = router;
