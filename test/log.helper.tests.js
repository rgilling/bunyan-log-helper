const settings = require('./settings');
const Logger = require('../');

/*
 * Sorry testing is a bit manual. You have to check the messages are printed correctly.
 */
describe('Log Helper', () => {
  let logOpts;

  beforeEach(() => {
    logOpts = JSON.parse(JSON.stringify(settings));
  });

  it('should print message once', () => {
    const _Logger = new Logger(logOpts);
    const logger1 = _Logger.logger('module1');
    logger1.info('message 1');
  });

  it('should not print a console message', () => {
    logOpts.console = false;
    const logger = new Logger(logOpts).logger('module1');
    logger.info('message 2');
  });

  it('should only print one message to file but two to console', () => {
    logOpts.outputStreams[0].level = 'info';
    logOpts.level = 'debug';
    const logger = new Logger(logOpts).logger('module1');
    logger.debug('message 3');
    logger.info('message 4');
  });
});
