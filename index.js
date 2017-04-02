const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

/**
 * Utility class for initialising the bunyan child logger
 */
class Logger {

  /**
   * Sets up the bunyan logger
   */
  constructor(loggingOptions) {
    if (loggingOptions) {
      this.options = loggingOptions;
      if (process.env.quiet) {
        this.options.quiet = true;
      }

      if (!this.options) {
        throw new Error('logging options not configured');
      }

      if (this.options.outputStreams.length) {
        this.streams = JSON.parse(JSON.stringify(this.options.outputStreams));
      } else {
        this.streams = [];
      }

      if (this.streams.length) {
        /* dumb cloning without lodash yay!
           otherwise it was causing issue in test */
        this.streams.forEach((stream) => {
          stream.level = stream.level || this.options.level;
        });
      }
      if (this.options.console) {
        this._setupConsole();
      }

      this._logger = bunyan.createLogger({
        name: this.options.prefix,
        streams: this.streams
      });
    }
  }

  _createConsoleStream() {
    if (!this.consoleStream) {
      this.consoleStream = new PrettyStream();
      this.consoleStream.pipe(process.stdout);
    }
  }

  /**
   * Optionally sets up the console logging unless quiet
   * options is specified.
   */
  _setupConsole() {
    if (!(this.options.quiet)) {
      this._createConsoleStream();
      this.streams.push({
        level: this.options.level,
        type: 'raw',
        stream: this.consoleStream,
      });
    }
  }

  /**
   * Utility function is exposed to easily build a
   * child logger.
   */
  logger(logName) {
    return this._logger.child({
      unit: logName
    });
  }
}

module.exports = Logger;
