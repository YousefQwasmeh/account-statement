const dbConnection = require("../dbConnection");
const addRecord = ({ description, customer_name, date, amount }) => {
  return dbConnection
    .query(
      "INSERT INTO record (customer_name,description,date,amount) VALUES ($1,$2,$3,$4)",
      [customer_name, description, date, amount]
    )
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = addRecord;
