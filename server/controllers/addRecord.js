const addRecordQuery = require("../database/queries/addRecord");

const addRecord = (req, res) => {
  return addRecordQuery(req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) =>
      res.status(500).json({ err: "err for addRecord controller" })
    );
};
module.exports = addRecord;
