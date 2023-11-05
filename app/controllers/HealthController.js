const { sequelize } = require("../../config/database");
const { statdClient } = require("../../config/statsd");
const { logger } = require("../../config/logger");

function validateDBConnection(req, res) {
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Successfull DB connection")
      res.status(200).end();
    })
    .catch((error) => {
      logger.error("Unable to connect to DB")
      res.status(503).end();
    });
}

async function healthzHandler(req, res) {
  statdClient.increment('webapp.totalHealthzCounter');
  res.setHeader("Cache-Control", "no-cache");
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  } else if (
    (req.body && Object.keys(req.body).length > 0) ||
    Object.keys(req.query).length > 0
  ) {
    res.status(400).end();
    return;
  } else {
    statdClient.increment('webapp.validHealthzCounter');
    validateDBConnection(req, res);
  }
}

module.exports = {
  healthzHandler: healthzHandler,
};
