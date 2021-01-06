const dbConnection = require("../dbConnection");
const getAllCustomers = () => {
  return dbConnection("2019+2020")
    .query("SELECT id,name,email,img,phone,note FROM customer ")
    .then((res) =>
      dbConnection("2021")
        .query("SELECT id,name,email,img,phone,note FROM customer ")
        .then((res2) => [...new Set(...res.rows, ...res2.rows)])
        .catch((err2) => res.rows)
    )
    .catch((err) => err);
};
module.exports = getAllCustomers;
