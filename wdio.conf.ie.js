var config = require('./wdio.conf.js').config;
config.capabilities = [{browserName: "internet explorer"}];
exports.config = config;