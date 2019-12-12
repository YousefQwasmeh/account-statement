const dbConnection = require("../dbConnection");
const getRecords = customerName => {
  return dbConnection
    .query(`SELECT * FROM record where customer_name = $1 ORDER BY date `, [
      customerName
    ])
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getRecords;
