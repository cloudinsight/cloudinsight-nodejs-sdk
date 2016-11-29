var assert = require( 'assert' );
var StatsD = require( '../lib/index' ).StatsD;

var statsd = new StatsD( 'localhost', 8251 );

describe( 'gauge method testing', function() {

  it( 'Errors should not occur with float value', function( done ) {
    statsd.gauge( 'mocha.gauge.float', 283.8, [], 2, function( e ) {
      assert( e ); // e should not be falsy
    } );

    statsd.gauge( 'mocha.gauge.float', 283.8, [], 0, function( e ) {
      assert.equal( !!e, false );
    } );

    statsd.gauge( 'mocha.gauge.float', 283.8, [], 0.8 );
    statsd.gauge( 'mocha.gauge.float', 0.0, [], 0.5 );
    statsd.gauge( 'mocha.gauge.float', 283.8, [ 'mytag1:myvalue1', 'mytag2:myvalue2' ], 0.83, done );
  } );

  it( 'Errors should not occur with integer value', function( done ) {
    statsd.gauge( 'mocha.gauge.int', 0, [], 1 );
    statsd.gauge( 'mocha.gauge.int', 512, [], 1 );
    statsd.gauge( 'mocha.gauge.int', 1024, [ 'mytag1:myvalue1', 'mytag2:myvalue2' ], 0.00 );
    statsd.gauge( 'mocha.gauge.int', 9999999, [], 1, done );
  } );

  it( 'Errors should be returned with none numeric value', function( done ) {
    statsd.gauge( 'mocha.gauge.string', 'hello', [], 1, function(e) {
      statsd.gauge( 'mocha.gauge.string', { name : 'John Carmack' }, [], 1, function(e) {
        assert( e );
        statsd.gauge( 'mocha.gauge.string', [1,2,3,4], [], 1, function(e) {
          done();
        } );
      } );
    } );
  } );

} );



describe( 'increment/decrement method testing', function() {

  it( 'Errors should not occur', function( done ) {
    statsd.increment( 'mocha.increment.count', [], 0.8 );
    statsd.increment( 'mocha.increment.count', [ 'mytag1:myvalue1' ], 0.8 );
    statsd.increment( 'mocha.increment.count', [ 'mytag1:myvalue1' ], 0 );

    statsd.decrement( 'mocha.decrement.count', [], 0.8 );
    statsd.decrement( 'mocha.decrement.count', [ 'mytag1:myvalue1' ], 0.8 );
    statsd.decrement( 'mocha.decrement.count', [ 'mytag1:myvalue1' ], 0 );

    statsd.increment( 'mocha.increment.count', [ 'mytag1:myvalue1' ], 1.2, function(e) {
      assert( e );
      done();
    } );
  } );

} );


describe( 'incrementBy/decrementBy method testing', function() {

  it( 'Errors should not occur', function( done ) {
    statsd.incrementBy( 'mocha.incrementBy.count', 3, [], 0.8 );
    statsd.incrementBy( 'mocha.incrementBy.count', -3, [], 0.8 );

    statsd.incrementBy( 'mocha.incrementBy.count', 38, [ 'mytag1:myvalue1' ], 0.8 );
    statsd.incrementBy( 'mocha.incrementBy.count', -38.1, [ 'mytag1:myvalue1' ], 0.8 );

    statsd.incrementBy( 'mocha.incrementBy.count', 14, [ 'mytag1:myvalue1' ], 0 );

    statsd.incrementBy( 'mocha.incrementBy.count', 81, [ 'mytag1:myvalue1' ], 1.2, function(e) {
      assert( e );
    } );

    statsd.decrementBy( 'mocha.incrementBy.count', [], [ 'mytag1:myvalue1' ], 0.2, function(e) {
      assert( e );
      done();
    } );

  } );

} );
