let bunyan = require('bunyan');
let logger = bunyan.createLogger({name: 'webapp'});

module.exports = {
    logger: logger
}