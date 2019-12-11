const dbConnection = require("../dbConnection");

const getCustomerInformation = customerId => {
  return dbConnection
    .query("SELECT * FROM customer where id=$1", [customerId])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

module.exports = getCustomerInformation;
