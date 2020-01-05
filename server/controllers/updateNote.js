const updateNoteQuery = require("../database/queries/updateNote");
const qs = require("qs");

const updateNote = (req, res) => {
  updateNoteQuery(req.body)
    .then(data => {
      return res.json(data);
    })
    .catch(err =>
      res.status(500).json({ err: "err for update note controller" })
    );
};
module.exports = updateNote;
