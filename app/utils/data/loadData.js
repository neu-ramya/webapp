const Account = require('../../models/Account');
const { parseCSV } = require('./parsecsv');
const { insertDataIntoTable } = require('./insertData');

const accountCSVPath = '/Users/ramya/Cloud/webapp/app/data/users.csv';

async function loadData() {
  try {
    // Parse the CSV data
    const accountData = await parseCSV(accountCSVPath);

    // Insert data into the tables
    await insertDataIntoTable(Account, accountData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the named function to load data
module.exports = {
  loadData: loadData
};
