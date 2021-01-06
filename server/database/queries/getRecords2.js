// const dbConnection = require("../dbConnection");
//   console.log("1111111", fromDate, toDate);
//   return dbConnection
//     .query(`SELECT * FROM record where date > $1 and date <= $2 ORDER BY id `, [
//       fromDate,
//       toDate
//     ])
//     .then(res => res.rows)
//     .catch(err => err);
// };
// module.exports = getRecords2;

const dbConnection = require("../dbConnection");
const getRecords2 = ({ fromDate, toDate }) => {
  return dbConnection()
    .query(`SELECT * FROM record where date > $1 and date <= $2 ORDER BY id `, [
      fromDate,
      toDate,
    ])
    .then((res) => res.rows)
    .catch((err) => err);
};
module.exports = getRecords2;
