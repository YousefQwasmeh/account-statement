const dbConnection = require("../dbConnection");
const getRecords = (customerName, branch = 1) => {
  return dbConnection()
    .query(
      `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
      [customerName, branch]
    )
    .then((res) =>
      dbConnection("2019+2020")
        .query(
          `SELECT * FROM record where customer_name = $1 and branch = $2 ORDER BY date `,
          [customerName, branch]
        )
        .then((res2) => [...res2.rows, ...res.rows])
        .catch((err2) => res.rows)
    )
    .catch((err) => err);
};
module.exports = getRecords;
