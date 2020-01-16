const dbConnection = require("../dbConnection");
const getRecords = (customerName, branch) => {
  return dbConnection
    .query(
      `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
      [customerName, branch || 1]
    )
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getRecords;
