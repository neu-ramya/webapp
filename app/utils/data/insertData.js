const bcrypt = require("bcrypt");
const { logger } = require("./config/logger");

async function insertDataIntoAccountTable(Model, data) {
  try {
    for (const item of data) {
      const existingRecord = await Model.findOne({
        where: { email: item.email },
      });
      if (existingRecord) {
        logger.info(`Email ${item.email} already exists. Skipping insertion.`);
      } else {
        const hashedPassword = await bcrypt.hash(item.password, 10);
        item.password = hashedPassword;
        await Model.create(item);
        logger.info(`Data for email ${item.email} inserted successfully.`);
      }
    }
  } catch (error) {
    logger.error(error);
  }
}

async function insertDataIntoAssignmentTable(Model, data) {
  try {
    await Model.destroy({
      where: {},
    })
    await Model.bulkCreate(data);
    logger.info("Inserted into assignments table");    
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  insertDataIntoAccountTable: insertDataIntoAccountTable,
  insertDataIntoAssignmentTable: insertDataIntoAssignmentTable
};
