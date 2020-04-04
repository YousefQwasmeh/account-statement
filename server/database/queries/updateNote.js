const dbConnection = require("../dbConnection");
const updateNote = ({ note, name }) => {
  return dbConnection
    .query("UPDATE customer set note=$2 where name=$1 ", [name, note])
    .then(res => res.rows)
    .catch(err => err);
};
module.exports = updateNote;
