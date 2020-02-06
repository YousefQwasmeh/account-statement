const dbConnection = require("../dbConnection");
const getRecords2 = ({ fromDate, toDate }) => {
  console.log("1111111", fromDate, toDate);
  return dbConnection
    .query(`SELECT * FROM record where date > $1 and date <= $2 ORDER BY id `, [
      fromDate,
      toDate
    ])
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getRecords2;
/*
const dbConnection = require("../dbConnection");
const dbConnection2019 = require("../dbConnection2019");
const getRecords2 = ({ fromDate, toDate }) => {
  console.log("1111111", fromDate, toDate);
  return dbConnection
    .query(`SELECT * FROM record where date > $1 and date <= $2 ORDER BY id `, [
      fromDate,
      toDate
    ])
    .then(res =>
      dbConnection2019
        .query(
          `SELECT * FROM record where date > $1 and date <= $2 ORDER BY id `,
          [fromDate, toDate]
        )
        .then(res2019 => {
          console.log(res2019.rows, "2019", res.rows, "2020");
          return res2019.rows.concat(res.rows);
        })
        .catch(err2019 => err2019)
    )
    .catch(err => err);
};
module.exports = getRecords2;

*/
