const xlsx = require("xlsx");
const multer = require("multer");
const addRecord = require("./addRecord");
const addCustomer = require("./addCustomer");
const dbBuild = require("../database/dbBuild");
const readExcel = async (req, res) => {
  const upload = multer({}).single("excelFile");
  upload(req, res, async (err) => {
    const year = req.body.year;
    if (err) {
      return res.status(500).json({ err: "err can't upload Excel." });
    } else {
      let wb;
      let ws;
      try {
        wb = xlsx.read(req.file.buffer, { cellDates: true });
        ws = wb.Sheets[wb.SheetNames[0]];
      } catch (e) {
        return res.status(500).json({ err: "err can't read Excel file." });
      }
      try {
        await dbBuild(year);
      } catch (e) {
        console.log(e, "readExcel.js await dbBuild: " + year);
        return res.status(500).json({ err: "err can't reBuild DB." });
      }
      for (let i = 4; i < 26000; ++i) {
        try {
          if (ws["A" + i] && ws["A" + i]["v"]) {
            const customerName = ws["A" + i]["v"];
            const description = ws["C" + i] ? ws["C" + i]["w"] : null;
            const date = ws["D" + i]
              ? new Date(ws["D" + i]["v"].getTime() + 1000 * 60 * 60 * 10)
              : null;
            const amount = ws["B" + i] ? ws["B" + i]["v"] : null;
            const recordInfo = {
              customerName,
              description,
              date,
              amount,
            };
            addRecord({ recordInfo, year, i });
          }
        } catch (e) {
          console.log("i: ", i, "err record");
        }
      }

      ws = wb.Sheets[wb.SheetNames[2]];
      for (let i = 4; i < 700; ++i) {
        let name = null;
        let phone = null;
        let note = null;
        if (ws["A" + i]) {
          if (ws["A" + i] && ws["A" + i]["v"]) name = ws["A" + i]["v"];
          if (ws["E" + i] && ws["E" + i]["v"]) phone = ws["E" + i]["v"];
          if (ws["F" + i] && ws["F" + i]["v"]) note = ws["F" + i]["v"];
        }

        if (ws["A" + i] && ws["A" + i]["v"]) {
          const name = ws["A" + i]["v"];
          const customerInfo = {
            name,
            email: null,
            password: null,
            phone,
            img: null,
            note,
            type: 1,
          };
          addCustomer({ customerInfo, year, i });
        }
      }
      res.redirect("/");
    }
  });
};
module.exports = readExcel;
