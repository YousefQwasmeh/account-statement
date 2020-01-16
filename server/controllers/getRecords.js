const getRecordsQuery = require("../database/queries/getRecords");
const getCustomerInformationQuery = require("../database/queries/getCustomerInformation");
const qs = require("qs");

const getRecords = (req, res) => {
  getCustomerInformationQuery(req.params.customerName)
    .then(data => {
      info = data;
    })
    .catch(err =>
      res.status(500).json({ err: "err for get Records info controller" })
    );
  getRecordsQuery(req.params.customerName, req.params.branch)
    .then(data => {
      getCustomerInformationQuery(req.params.customerName)
        .then(info2 => {
          console.log(info);
          return res.json({ data, info2: info2[0] });
        })
        .catch(err =>
          res.status(500).json({ err: "err for get Records info controller" })
        );
    })
    .catch(err =>
      res.status(500).json({ err: "err for get Records controller" })
    );
};
module.exports = getRecords;
