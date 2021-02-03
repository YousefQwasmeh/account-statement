const dbConnection = require("../dbConnection");

const addCustomerUrl = ({ customerName, url }) => {
  return dbConnection()
    .query("INSERT INTO customer_url (customer_name,url) VALUES ($1,$2)", [
      customerName,
      url,
    ])
    .then((res) => res.rows)
    .catch();
};
module.exports = addCustomerUrl;
