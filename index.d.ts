import * as BunyanLogger from 'bunyan';

declare interface LogOptions {
  level?: string,
  outputStreams?: BunyanLogger.Stream,
  prefix: string,
  console: boolean
}

export class Logger {
  constructor(options: LogOptions);

  logger(name: string): Logger;
}


