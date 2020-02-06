const getRecordsQuery = require("../database/queries/getRecords2");

const getRecords2 = (req, res) => {
  getRecordsQuery(req.params)
    .then(data => {
      return res.json(data);
    })
    .catch(err =>
      res.status(500).json({ err: "err for get Records2 info controller" })
    );
};
module.exports = getRecords2;
