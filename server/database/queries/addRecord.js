const dbConnection = require("../dbConnection");
const addRecord = ({ description, customerName, date, amount, branchNo }) => {
  return dbConnection
    .query(
      "INSERT INTO record (customer_name,description,date,amount,branch) VALUES ($1,$2,$3,$4,$5)",
      [customerName, description, date, amount, branchNo]
    )
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = addRecord;
