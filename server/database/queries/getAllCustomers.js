const dbConnection = require("../dbConnection");
const getAllCustomers = () => {
  return dbConnection
    .query("SELECT id,name,email,img,phone,note FROM customer ")
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = getAllCustomers;
