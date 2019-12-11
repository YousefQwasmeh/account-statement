const dbConnection = require("../dbConnection");
const getRecords = customerName => {
  console.log("9999999999999999999");
  return dbConnection
    .query("SELECT * FROM record where customer_name = $1 ORDER BY date ", [
      customerName
    ])
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getRecords;
