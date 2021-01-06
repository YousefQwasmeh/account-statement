const dbConnection = require("../dbConnection");
// const dbConnection2018 = require("../dbConnection");
// const dbConnection20192020 = require("../dbConnection");
// const dbConnection2021 = require("../dbConnection");
// const dbConnection0 = {
//   2018: dbConnection2018,
//   "2019+2020": dbConnection20192020,
//   2021: dbConnection2021,
// };
const addRecord = ({
  description,
  customerName,
  date,
  amount,
  branchNo = 1,
  year = 2021,
}) => {
  return dbConnection(year)
    .query(
      "INSERT INTO record (customer_name,description,date,amount,branch) VALUES ($1,$2,$3,$4,$5)",
      [customerName, description, date, amount, branchNo]
    )
    .then((res) => res.rows)
    .catch((err) => err);
};
module.exports = addRecord;
