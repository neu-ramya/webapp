let StatsD = require('node-statsd');

let statdClient = new StatsD();
statdClient.host = 'localhost';
statdClient.port = 8125;

module.exports = {
    statdClient: statdClient,
};
  