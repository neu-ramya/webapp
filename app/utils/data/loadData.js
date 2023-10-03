const Account = require("../../models/Account");
const Assignment = require("../../models/assignment");

const { parseCSV } = require("./parsecsv");
const { insertDataIntoAccountTable, insertDataIntoAssignmentTable } = require("./insertData");

const accountCSVPath = "/Users/ramya/Cloud/webapp/app/data/users.csv";

async function loadData() {
  if(process.env.PROF_TABLES === "true") {
    try {
      const accountData = await parseCSV(accountCSVPath);
      await insertDataIntoAccountTable(Account, accountData);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    try {
      const localAccountDataCSVPath = "/Users/ramya/Cloud/webapp/app/data/seed/users.csv";
      const localAssignmentDataCSVPath = "/Users/ramya/Cloud/webapp/app/data/seed/assignments.csv";
      const accountData = await parseCSV(localAccountDataCSVPath);
      const assignmentData = await parseCSV(localAssignmentDataCSVPath);
      await insertDataIntoAccountTable(Account, accountData);
      await insertDataIntoAssignmentTable(Assignment, assignmentData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

}

module.exports = {
  loadData: loadData,
};
