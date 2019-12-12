const getRecordsQuery = require("../database/queries/getRecords");
const qs = require("qs");

const getRecords = (req, res) => {
  // console.log(qs.parse(req.params.customerName), "444444444");
  console.log(req.params.customerName, "3333");
  getRecordsQuery(req.params.customerName)
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({ err: "error for get Records controller" })
    );
};
module.exports = getRecords;
