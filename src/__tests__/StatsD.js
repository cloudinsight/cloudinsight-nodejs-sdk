jest.mock('dgram');

const assert = require('assert');
const StatsD = require('../').StatsD;

describe('StatsD', () => {
  it('constructor and close', () => {
    const statsd = new StatsD();
    expect(statsd.host).toBe('localhost')
    expect(statsd.port).toBe(8251)
    statsd.close();
    expect(statsd.socket.close).toBeCalled();
  });

  it('gauge', () => {
    const statsd = new StatsD();
    statsd.gauge('a', 1);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:1|g'), 0, 5, 8251, 'localhost', undefined
    ]);
  });

  it('withGlobalTags', () => {
    const statsd = new StatsD(undefined, undefined, ["a"]);
    statsd.gauge('a', 1);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:1|g|#a'), 0, 8, 8251, 'localhost', undefined
    ]);
  });

  it('withInvaidValue', () => {
    const statsd = new StatsD();
    expect(() => {
      statsd.gauge('a', {});
    }).toThrow();
  });

  it('withInvaidValue and errorCallback', () => {
    const statsd = new StatsD();
    const cb = jest.fn();
    statsd.gauge('a', {}, [], 1, cb);
    expect(cb).toBeCalled();
  });

  describe('with sampleRate', () => {

    it('invalid sampleRate', () => {
      const statsd = new StatsD();
      expect(() => {
        statsd.gauge('a', 1, [], 2);
      }).toThrow();
    });

    it('invalid sampleRate with errorCallback', () => {
      const statsd = new StatsD();
      const cb = jest.fn();
      statsd.gauge('a', 1, [], 2, cb);
      expect(cb).toBeCalled();
    });

    it('at 50%', () => {
      const statsd = new StatsD();
      statsd.gauge('a', 1, [], 0.5);
      expect(statsd.socket.send.mock.calls[0]).toEqual([
        new Buffer('a:1|g|@0.5'), 0, 10, 8251, 'localhost', undefined
      ]);
    });
  });

  it('increment', () => {
    const statsd = new StatsD();
    statsd.increment('a', 1);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:1|c'), 0, 5, 8251, 'localhost', undefined
    ]);
  });

  it('decrement', () => {
    const statsd = new StatsD();
    statsd.decrement('a', 1);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:-1|c'), 0, 6, 8251, 'localhost', undefined
    ]);
  });

  it('incrementBy', () => {
    const statsd = new StatsD();
    statsd.incrementBy('a', 2);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:2|c'), 0, 5, 8251, 'localhost', undefined
    ])
  });

  it('incrementByDefault', () => {
    const statsd = new StatsD();
    statsd.incrementBy('a');
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:1|c'), 0, 5, 8251, 'localhost', undefined
    ])
  });

  it('decrementBy', () => {
    const statsd = new StatsD();
    statsd.decrementBy('a', -2);
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:-2|c'), 0, 6, 8251, 'localhost', undefined
    ])
  });

  it('decrementByDefault', () => {
    const statsd = new StatsD();
    statsd.decrementBy('a');
    expect(statsd.socket.send.mock.calls[0]).toEqual([
      new Buffer('a:-1|c'), 0, 6, 8251, 'localhost', undefined
    ])
  });

});
