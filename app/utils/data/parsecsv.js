const fs = require("fs");
const csv = require("csv-parser");
const { logger } = require("./config/logger");

function parseCSV(filePath) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

module.exports = {
  parseCSV: parseCSV,
};
