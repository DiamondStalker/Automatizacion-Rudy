var fs = require('fs');

var util = require('util');

var log_file = fs.createWriteStream(__dirname.replace('Components','log') + '/debug.log', { flags: 'a' });

var log_stdout = process.stdout;



console.log = function (d) {

    var timestamp = new Date().toISOString();
    var log_message = timestamp + ' - ' + util.format(d) + '\n';

    log_file.write(log_message);
    log_stdout.write(log_message);

};

module.exports = console;

// USE => var console = require('./logger.js');