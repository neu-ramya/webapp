const path = require('path');
const Account = require("../../models/Account");
const Assignment = require("../../models/Assignment");
const Submission = require("../../models/Submission");
const { logger } = require("../../../config/logger");

const { parseCSV } = require("./parsecsv");
const { insertDataIntoAccountTable, insertDataIntoAssignmentTable } = require("./insertData");

const accountCSVRelativePath = '../../data/users.csv';
const localAccountCSVRelativePath = '../../data/seed/users.csv';
const localAssignmentCSVRelativePath = '../../data/seed/assignments.csv';
const fullAccountCSVPath = path.resolve(__dirname, accountCSVRelativePath);

async function loadData() {
  if(process.env.PROF_TABLES === "true") {
    try {
      const accountData = await parseCSV(fullAccountCSVPath);
      await insertDataIntoAccountTable(Account, accountData);
    } catch (error) {
      logger.error(error);
    }
  } else {
    try {
      const fullLocalAccountCSVPath = path.resolve(__dirname, localAccountCSVRelativePath);
      const fullLocalAssignmentCSVPath = path.resolve(__dirname, localAssignmentCSVRelativePath);
      const accountData = await parseCSV(fullLocalAccountCSVPath);
      const assignmentData = await parseCSV(fullLocalAssignmentCSVPath);
      await insertDataIntoAccountTable(Account, accountData);
      await insertDataIntoAssignmentTable(Assignment, assignmentData);
    } catch (error) {
      logger.error(error);
    }
  }

}

module.exports = {
  loadData: loadData,
};
