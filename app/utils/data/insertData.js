async function insertDataIntoTable(Model, data) {
    try {
      await Model.bulkCreate(data);
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
  
  module.exports = {
    insertDataIntoTable: insertDataIntoTable,
}