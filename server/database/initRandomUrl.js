const addCustomerUrlQueries = require("./queries/addCustomerUrl");
const getAllCustomersQueries = require("./queries/getAllCustomers");
const randomUrl = require("../helper/randomUrl");

const createCustomerUrl = async (customerName) => {
  const url = randomUrl();
  try {
    await addCustomerUrlQueries({ customerName, url });
  } catch (err) {
    if (err.detail.indexOf("url") !== -1) createCustomerUrl(customerName);
    console.log("000000000001", err.detail);
  }
};
const initRandomUrl = async () => {
  const customers = await getAllCustomersQueries();
  const customersNames = customers.map((customer) => customer.name);
  customersNames.forEach(createCustomerUrl);
};
// initRandomUrl();
module.exports = initRandomUrl;
