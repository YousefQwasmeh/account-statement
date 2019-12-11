const getRecordsQuery = require("../database/queries/getRecords");

const getRecords = (req, res) => {
  getRecordsQuery("حسن دلال")
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({ err: "error for get Records controller" })
    );
};
module.exports = getRecords;
git commit -m "files react with 2 component is temp to try and cosole log date from api
