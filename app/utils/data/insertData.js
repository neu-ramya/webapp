const bcrypt = require("bcrypt");

async function insertDataIntoAccountTable(Model, data) {
  try {
    for (const item of data) {
      const existingRecord = await Model.findOne({
        where: { email: item.email },
      });
      if (existingRecord) {
        console.log(`Email ${item.email} already exists. Skipping insertion.`);
      } else {
        const hashedPassword = await bcrypt.hash(item.password, 10);
        item.password = hashedPassword;
        await Model.create(item);
        console.log(`Data for email ${item.email} inserted successfully.`);
      }
    }
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  }
}

async function insertDataIntoAssignmentTable(Model, data) {
  try {
    await Model.destroy({
      where: {},
    })
    await Model.bulkCreate(data);
    console.log("Inserted into assignments table");    
  } catch (error) {
    console.error("Error inserting or updating data:", error);
  }
}

module.exports = {
  insertDataIntoAccountTable: insertDataIntoAccountTable,
  insertDataIntoAssignmentTable: insertDataIntoAssignmentTable
};
