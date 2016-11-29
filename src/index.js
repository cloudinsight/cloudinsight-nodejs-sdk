/**
 * The SDK for Cloud Insight Agent which is based on statsd.
 *
 * The SDK connect with the agent by UDP socket, which is implemented as 'dgram' in Node.JS
 *
 * @author crystaldust(juzhenatpku@gmail.com)
 */

const StatsD = require('./StatsD');
exports.StatsD = StatsD;
