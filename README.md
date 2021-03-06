Cloudinsight SDK for Node.JS
================
[![](https://img.shields.io/travis/cloudinsight/cloudinsight-nodejs-sdk.svg)](https://travis-ci.org/cloudinsight/cloudinsight-nodejs-sdk)
[![](https://img.shields.io/npm/v/cloudinsight-sdk.svg)](https://www.npmjs.com/package/cloudinsight-sdk)
[![](https://img.shields.io/coveralls/cloudinsight/cloudinsight-nodejs-sdk.svg)](https://coveralls.io/github/cloudinsight/cloudinsight-nodejs-sdk)
[![](https://img.shields.io/npm/dm/cloudinsight-sdk.svg)](http://npm-stat.com/charts.html?package=cloudinsight-sdk)
[![](https://img.shields.io/npm/l/cloudinsight-sdk.svg)](https://github.com/cloudinsight/cloudinsight-nodejs-sdk/blob/master/LICENSE)

Installation
------------
```bash
npm install cloudinsight-sdk
```


Quick Start Guide
-----------------

``` javascript
// Require the module
var StatsD = require( 'cloudinsight-sdk' ).StatsD;

// Instantiate the StatsD, with host, port and global tags specified.
// The default host & port is 'localhost:8251'
var statsd = new StatsD( '127.0.0.1', 8251, [ 'machineName:awsBeijing1', 'timezone:GMT8' ] );

// Increment a counter.
statsd.increment('page.views')

// Increment a counter with value.
statsd.incrementBy('page.views', 100)


// Record a gauge with custom tags and sample rate(50% of the time).
statsd.gauge('users.online', 128, [ 'mytag:myvalue' ], 0.5)
```

For detailed information, please visit http://docs-ci.oneapm.com/api/nodejs.html



[npm-image]: https://img.shields.io/npm/v/cloudinsight-sdk.svg
[npm-url]: https://npmjs.org/package/cloudinsight-sdk
[downloads-image]: https://img.shields.io/npm/dm/cloudinsight-sdk.svg
[downloads-url]: https://npmjs.org/package/cloudinsight-sdk
[travis-image]: https://travis-ci.org/cloudinsight/cloudinsight-nodejs-sdk.svg?branch=master
[travis-url]: https://travis-ci.org/cloudinsight/cloudinsight-nodejs-sdk
