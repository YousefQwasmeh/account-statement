const dbConnection = require("../dbConnection");
const addCustomer = ({ name, email, password, phone, img, type }) => {
  return dbConnection
    .query(
      "INSERT INTO customer (name, email,password,phone,img,type) values ($1,$2,$3,$4,$5,$6)",
      [name, email, password, phone, img, type]
    )
    .then(res => res.rows);
};
module.exports = addCustomer;
