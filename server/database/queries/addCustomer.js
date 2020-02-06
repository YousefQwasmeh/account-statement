const dbConnection = require("../dbConnection");
const addCustomer = ({ name, email, password, phone, img, type, note }) => {
  return dbConnection
    .query(
      "INSERT INTO customer (name, email,password,phone,img,type,note) values ($1,$2,$3,$4,$5,$6,$7)",
      [name, email, password, phone, img, type, note]
    )
    .then(res => res.rows);
};
module.exports = addCustomer;
