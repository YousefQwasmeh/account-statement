const addRecordQuery = require("../database/queries/addRecord");

const addRecord = (req, res) => {
  return addRecordQuery({ ...req.body, ...req.recordInfo, year: req.year })
    .then((data) => {
      if (req.i % 500 === 0) console.log("pass:", req.i);
      if (req.body) return res.json(data);
    })
    .catch((err) => {
      console.log("err:" + req.i, req.recordInfo);
      if (req.body)
        res.status(500).json({ err: "err for addRecord controller" });
    });
};
module.exports = addRecord;
