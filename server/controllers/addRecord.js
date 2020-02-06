const addRecordQuery = require("../database/queries/addRecord");

const addRecord = (req, res) => {
  console.log(req.body, "65556666666666");
  return addRecordQuery(req.body)
    .then(data => {
      console.log("ddddddddddone");
      return res.json(data);
    })
    .catch(err =>
      res.status(500).json({ err: "err for addRecord controller" })
    );
};
module.exports = addRecord;
