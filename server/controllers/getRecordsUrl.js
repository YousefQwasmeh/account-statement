const getRecordsQuery = require("../database/queries/getRecords");
const getCustomerUrlQuery = require("../database/queries/getCustomerUrlQuery");
const getCustomerInformationQuery = require("../database/queries/getCustomerInformation");

const getRecordsUrl = async (req, res) => {
  const { customerUrl } = req.params;

  try {
    const { customerName } = await getCustomerUrlQuery(customerUrl);
    if (!customerName) return res.status(400).send("خطأ بالرابط");
    const [customerInfo] = await getCustomerInformationQuery(customerName);
    const records = await getRecordsQuery(customerName);

    return res.json({ records, customerInfo });
  } catch (e) {
    return res.status(500).send("err for get Records url controller");
  }
};

module.exports = getRecordsUrl;
