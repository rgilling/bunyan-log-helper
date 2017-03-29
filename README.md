## Overview

Very simple wrapper for creating Bunyan loggers from a common base.

1. Creates logging that uses a prefix and module approach.
2. Automatically create the console logger using `Bunyan-pretty-stream` module.

### Inspiration
I kept doing this in project after project, so decided to make it a module. Not much more to it than that. Bunyan is great especially when you use it with LogStash - basically replaces Splunk. But sometimes you need console printing.

### Installation

`npm install bunyan-log-helper`

### Usage

```js 
const Logger = require('bunyan-log-helper');

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
}

const _Logger = new Logger(logOpts);
const logger = _Logger.logger('module-1');

logger.info('hello world');

```

### What does it do?
Automatically configures the console logger if enabled.

Also writes logs as units within a main application. Notice the 'unit=module1'. 

```
[2017-03-29T08:37:44.371Z]  INFO: myApp/6416 on localhost: Hello World (unit=module1)
```

The benefit of using the child logger, is you can use hierarchical logging, so you can filter logs to applications and units within those applications.

`Example should go here`

#### Settings
Pass the logging settings to the class constructor.

Setting | Type | Description
---------- | ----------------
level | String | Debug/Info/Warn etc.
prefix | String | Log name will be prefixed with this. Use your main app name.
outputStreams | Object[]| Array of output streams (not including console)
console | Boolean | Whether to enable console logging

n.b level passed for a particular output stream will override top level.

#### Example Settings

```js
// base settings.js
module.exports = {
      level: 'debug',
      outputStreams: [{
        type: 'rotating-file',
        period: '1d',
        count: 3,
        level: 'info',
        path: path.resolve(path.join(__dirname, '../../logs/dataload.log')),
        }],
      console: true
}
```

### Dependencies

Package | Reason
--------- | ---------------------
bunyan | Logging
bunyan-prettystream | Logging to console

### Dev Dependencies
Package | Reason
-------------- | -----------------
eslint | Airbnb Stylguide for coding
mocha | Testing
should | Testing assertions

### Conributions
Fork it and fix, or submit an issue. Otherwise star it on Github so I know you're using it.

### Need changes? 
Submit an issue or better yet a pull-request on the [Github repository](https://github.com/rgilling/bunyan-log-helper/issues).


### License
MIT License










