const dbConnection = require("../dbConnection");

const getCustomerInformation = customerName => {
  return dbConnection()
    .query("SELECT phone,note FROM customer where name=$1", [customerName])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

module.exports = getCustomerInformation;
