const path = require('path');

module.exports = {
  level: 'debug',
  prefix: 'testApp',
  outputStreams: [{
    type: 'rotating-file',
    period: '1d',
    count: 3,
    path: path.resolve(path.join(__dirname, './logs/testing.log')),
  }],
  console: true
};
