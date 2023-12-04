require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require('body-parser')

const port = process.env.PORT || 3000;
const { sequelize } = require("./config/database");
const { logger } = require("./config/logger");
const { loadData } = require("./app/utils/data/loadData");

const Account = require("./app/models/Account");
const Assignment = require("./app/models/Assignment");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await loadData();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.fatal("Unable to connect to Database");
    logger.error(error);
  }
})();

app.use("/v1/healthz", bodyParser.raw(), bodyParser.json(), bodyParser.urlencoded(), bodyParser.text(), require("./app/routes/healthz"));
app.use("/v1/assignments", bodyParser.raw(), bodyParser.json(), bodyParser.urlencoded(), bodyParser.text(), require("./app/routes/assignments"));

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
