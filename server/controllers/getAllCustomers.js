const getAllCustomersQuery = require("../database/queries/getAllCustomers");
const qs = require("qs");

const getAllCustomers = (req, res) => {
  getAllCustomersQuery()
    .then(allCustomers =>
      res.json(
        allCustomers.map(customer => {
          return customer.name;
        })
      )
    )
    .catch(err =>
      res.status(500).json({ err: "error for getAllCustomers controller" })
    );
};
module.exports = getAllCustomers;
