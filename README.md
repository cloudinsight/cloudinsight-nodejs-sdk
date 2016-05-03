Cloud Insight SDK for Node.JS
================

SDK for Cloud Insight.

http://docs-ci.oneapm.com/api/nodejs.html

Installation
------------
```bash
npm install cloudinsight
```


Quick Start Guide
-----------------

``` javascript
// Require the module
var StatsD = require( 'cloudinsight' ).StatsD;

// Instantiate the StatsD, with host, port and global tags specified.
// The default host & port is 'localhost:8251'
var statsd = new StatsD( '127.0.0.1', 8251, [ 'machineName:awsBeijing1', 'timezone:GMT8' ] );

// Increment a counter.
statsd.increment('page.views')

// Increment a counter with value.
statsd.incrementBy('page.views', 100)


// Record a gauge with custom tags and sample rate(50% of the time).
statsd.gauge('users.online', 128, [ 'mytag:myvalue' ], 0.5)
