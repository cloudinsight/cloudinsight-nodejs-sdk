/**
 * The SDK for Cloud Insight Agent which is based on statsd.
 *
 * The SDK connect with the agent by UDP socket, which is implemented as 'dgram' in Node.JS
 *
 * @author crystaldust(juzhenatpku@gmail.com)
 */

var dgram = require( 'dgram' );

function StatsD( host, port, globalTags ) {
  this.host       = host || 'localhost';
  this.port       = port || 8251;
  this.globalTags = globalTags;

  this.socket     = dgram.createSocket( { type: 'udp4' } );
}

StatsD.prototype.gauge = function( metric, value, tags, sampleRate, cb ) {
  this._sendMetric( metric, 'g', value, tags, sampleRate || 1, cb );
}

StatsD.prototype.increment = function( metric, tags, sampleRate, cb ) {
  this._sendMetric( metric, 'c', 1, tags, sampleRate || 1, cb );
}

StatsD.prototype.decrement = function( metric, tags, sampleRate, cb ) {
  this._sendMetric( metric, 'c', -1, tags, sampleRate || 1, cb );
}


StatsD.prototype.incrementBy = function( metric, value, tags, sampleRate, cb ) {
  this._sendMetric( metric, 'c', value || 1, tags, sampleRate || 1, cb  );
}

StatsD.prototype.decrementBy = function( metric, value, tags, sampleRate, cb ) {
  this._sendMetric( metric, 'c', value || -1, tags, sampleRate || 1, cb );
}

StatsD.prototype.close = function() {
  this.socket.close();
}

StatsD.prototype._sendMetric = function( metric, type, value, tags, sampleRate, cb ) {
  // Essential checkings
  if( sampleRate <=0 || sampleRate > 1 ) {
    var errInvalidSampleRate =  new Error( "SampleRate should be within ( 0, 1 ]" );
    if( cb )
      return cb( errInvalidSampleRate );
    else
      throw( errInvalidSampleRate );
  }
  if( typeof value !== 'number' ) {
    var errInvalidValue =  new Error( "Value should be number" );
    if( cb ) {
      return cb( errInvalidValue );
    }
    else {
      throw( errInvalidValue );
    }
  }

  var payload = [ metric, ':', value, '|', type ];

  if( sampleRate && sampleRate !== 1 ) {
    payload.push( '|@' + sampleRate );
  }

  var tagsToSend = [];

  if( this.globalTags && Array.isArray( this.globalTags ) ) {
    tagsToSend = tagsToSend.concat( this.globalTags );
  }

  if( tags && Array.isArray( tags ) ) {
    tagsToSend = tagsToSend.concat( tags );
  }

  if( tagsToSend.length > 0 ) {
    payload.push( '|#' );
    payload = payload.concat( tagsToSend.join(',') );
  }

  var encoded = new Buffer( payload.join( '' ) );

  var args = [ encoded, 0, encoded.length, this.port, this.host];
  if( cb ) {
    args.push( cb );
  }
  this.socket.send.apply( this.socket, [ encoded, 0, encoded.length, this.port, this.host, cb ] )
}

exports.StatsD = StatsD;
