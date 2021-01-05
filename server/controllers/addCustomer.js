const addCustomerQuery = require("../database/queries/addCustomer");

const addCustomer = (req, res) => {
  return addCustomerQuery({ ...req.body, ...req.customerInfo, year: req.year })
    .then((data) => {
      if (req.i % 500 === 0) console.log("passCustomer:", req.i);
      if (req.body) return res.json(data);
    })
    .catch((err) => {
      console.log("err:" + req.i, req.customerInfo);
      if (req.body)
        res.status(500).json({ err: "err for addCustomer controller" });
    });
};
module.exports = addCustomer;
