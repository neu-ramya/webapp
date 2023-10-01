async function insertDataIntoTable(Model, data) {
    try {
      for (const item of data) {
        const existingRecord = await Model.findOne({ where: { email: item.email } });
        if (existingRecord) {
          console.log(`Email ${item.email} already exists. Skipping insertion.`);
        } else {
          await Model.create(item);
          console.log(`Data for email ${item.email} inserted successfully.`);
        }
      }
    } catch (error) {
      console.error('Error inserting or updating data:', error);
    }
  }
  
  module.exports = {
    insertDataIntoTable: insertDataIntoTable,
  };
  