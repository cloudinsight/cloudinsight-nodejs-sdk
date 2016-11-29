/**
 *
 * CloudInsight SDK for nodejs examples.
 *
 * This example shows how to get the air quality(dust density, PM2.5 in this example) and send it to the CloudInsight agent.
 * After the data is sent, you can see it in the backend of CloudInsight and add it to any forms of chart for futher display.
 * Make sure that the CloudInsight agent is running happily before you run this example.
 *
 * @author crystaldust(juzhenatpku@gmail.com)
 *
 */

var zlib   = require( 'zlib' );
var http   = require( 'http' );
var StatsD = require( '../' ).StatsD;
var statsd = new StatsD('localhost', 8251);

var PM25_API_PATH_BASE = "http://feed.aqicn.org/feed/";
var PM25_API_URL_TAIL  = "/en/feed.v1.json";

var n = 0;
getPM25( 'beijing', function( pm25 ) {
  statsd.gauge( 'air.beijing', parseFloat( pm25 ), ['time:gmt8', 'location:officeroom'] );
  console.log( 'beijing', pm25 );
  // We use this 'not elegent' way to make sure the two requests are finished,
  // since we don't want any flow control libs included, this is just an example.
  if( ++n >= 2 ) {
    process.exit( 0 );
  }
} );

getPM25( 'shanghai', function( pm25 ) {
  statsd.gauge( 'air.shanghai', parseFloat( pm25 ) );
  console.log( 'shanghai', pm25 );
  if( ++n >= 2 ) {
    process.exit( 0 );
  }
} );

/**
 * Get the PM2.5 value from an air quality info provider.
 */
function getPM25( city, callback ) {
  var options = {
    host : 'feed.aqicn.org',
    path : '/feed/' + city + '/en/feed.v1.json',
    headers : {
      // User-Agent IS needed!!
      'User-Agent' : 'User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
      'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding' :'gzip,deflate',
      'Accept-Language' :'zh-CN,zh;q=0.8,en;q=0.6',
      'Connection':'keep-alive'
    }
  };

  var req = http.request( options, function( res ) {
    var chunks = [];
    res.on( 'data', function( chunk ) {
      chunks.push( chunk );
    } );

    res.on( 'end', function() {
      var buffer = Buffer.concat( chunks );
      zlib.gunzip( buffer, function( err, decoded ) {
        var result = decoded.toString();
        var pm25 = JSON.parse( result ).aqi.val;
        callback( pm25 );
      } );
    } );
  } );

  req.end();
}
