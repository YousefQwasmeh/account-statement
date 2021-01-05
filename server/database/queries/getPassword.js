const dbConnection = require("../dbConnection");

const getPassword = email => {
  dbConnection()
    .query("SELECT password FROM users where email=$1", [email])
    .then(res => res.rows)
    .catch(err => console.log(err, "getPassword err in queries"));
};

module.exports = getPassword;
