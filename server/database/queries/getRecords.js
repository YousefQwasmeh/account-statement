const dbConnection = require("../dbConnection");
const getRecords = (customerName, branch = 1) => {
  return dbConnection()
    .query(
      `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
      [customerName, branch]
    )
    .then((res) => res.rows)
    .catch((err) => err);
};
module.exports = getRecords;
