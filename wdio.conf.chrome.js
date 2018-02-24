var config = require('./wdio.conf.js').config;
config.capabilities = [{browserName: "chrome"}];
exports.config = config;