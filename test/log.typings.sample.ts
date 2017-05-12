/**
 * Demo file to make sure the log helper typings are working
 */
import { Logger } from '..';
import * as path from 'path';

const logOpts = {
  prefix: 'myapp',
  level: 'debug',
  outputStreams: [{
    type: 'rotating-file',
    period: '1d',
    count: 3,
    level: 'info',
    path: path.resolve(path.join(__dirname, '../../logs/dataload.log')),
  }],
  console: true
};

const _Logger = new Logger(logOpts);
const logger = _Logger.logger('childName');
