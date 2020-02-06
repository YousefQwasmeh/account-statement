const dbConnection = require("../dbConnection");
const dbConnection2020 = require("../dbConnection2020");
const getRecords = (customerName, branch) => {
  return dbConnection
    .query(
      `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
      [customerName, branch || 1]
    )
    .then(res =>
      dbConnection2020
        .query(
          `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
          [customerName, branch || 1]
        )
        .then(res2020 => res.rows.concat(res2020.rows))
        .catch(err2020 => err2020)
    )
    .catch(err => err);
};
module.exports = getRecords;
