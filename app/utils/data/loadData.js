const Account = require("../../models/Account");
const { parseCSV } = require("./parsecsv");
const { insertDataIntoTable } = require("./insertData");

const accountCSVPath = "/Users/ramya/Cloud/webapp/app/data/users.csv";

async function loadData() {
  try {
    const accountData = await parseCSV(accountCSVPath);
    await insertDataIntoTable(Account, accountData);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  loadData: loadData,
};
