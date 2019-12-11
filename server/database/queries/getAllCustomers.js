const dbConnection = require("../dbConnection");
const getAllCustomers = () => {
  return dbConnection
    .query("SELECT * FROM customer ")
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getAllCustomers;
