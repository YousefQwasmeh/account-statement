const dbConnection = require("../dbConnection");
const dbConnection2019 = require("../dbConnection2019");
const getRecords = (customerName, branch) => {
  return dbConnection
    .query(
      `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
      [customerName, branch || 1]
    )
    .then(res =>
      dbConnection2019
        .query(
          `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
          [customerName, branch || 1]
        )
        .then(res2019 => res2019.rows.concat(res.rows))
        .catch(err2019 => err2019)
    )
    .catch(err => err);
};
module.exports = getRecords;
