const express = require("express");
const multer = require("multer");
const router = express.Router();
const getRecords = require("./getRecords");
const getAllCustomers = require("./getAllCustomers");
const updateNote = require("./updateNote");
const addRecord = require("./addRecord");
const getRecords2 = require("./getRecords2");
const readExcel = require("./readExcel");

router.get("/records/:customerName/:branch", getRecords);
router.get("/records/:customerName", getRecords);
router.get("/getAllCustomers", getAllCustomers);
router.post("/setNote", updateNote);
router.post("/addRecord", addRecord);
router.get("/getRecords/:fromDate/:toDate", getRecords2);
router.post("/upload", readExcel);

module.exports = router;
