const StatsD = require('node-statsd');

const statdClient = new StatsD();
statdClient.host = 'localhost';
statdClient.port = 8125;

module.exports = {
    statdClient: statdClient,
};
  