const { sequelize } = require("../../config/database");
const { statsd } = require("../../config/statsd");
const { logger } = require("../../config/logger");

function validateDBConnection(req, res) {
  sequelize
    .authenticate()
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(503).end();
    });
}

async function healthzHandler(req, res) {
  statsd.increment('webapp.totalHealthzCounter');
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
    statsd.increment('webapp.validHealthzCounter');
    validateDBConnection(req, res);
  }
}

module.exports = {
  healthzHandler: healthzHandler,
};
