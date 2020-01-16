const dbConnection = require("../dbConnection");
const updateNote = ({ description, name }) => {
  return dbConnection
    .query("UPDATE customer set description=$2 where name=$1 ", [
      name,
      description
    ])
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = updateNote;
