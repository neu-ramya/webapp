require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require('body-parser')

const port = process.env.PORT || 3000;
const { sequelize } = require("./config/database");
const { loadData } = require("./app/utils/data/loadData");

const Account = require("./app/models/Account");
const Assignment = require("./app/models/Assignment");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await loadData();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/healthz", bodyParser.raw(), bodyParser.json(), bodyParser.urlencoded(), bodyParser.text(), require("./app/routes/healthz"));
app.use("/assignments", bodyParser.raw(), bodyParser.json(), bodyParser.urlencoded(), bodyParser.text(), require("./app/routes/assignments"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
