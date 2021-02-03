const dbConnection = require("../dbConnection");

const getCustomerUrl = (customer_url, url) => {
  return dbConnection()
    .query(
      'SELECT customer_name AS "customerName", url FROM customer_url where url=$1 OR customer_name=$2',
      [customer_url, url]
    )
    .then((res) => res.rows[0] || { customerName: undefined, url: undefined })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = getCustomerUrl;
