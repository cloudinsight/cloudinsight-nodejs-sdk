import dgram from 'dgram';
import getOptions from './getOptions';

class StatsD {
  constructor(host, port, globalTags) {
    this.host = host || 'localhost';
    this.port = port || 8251;
    this.globalTags = globalTags;
    this.socket = dgram.createSocket(getOptions(process.version));
  }

  close() {
    this.socket.close();
  }

  gauge(metric, value, tags, sampleRate, cb) {
    this._sendMetric(metric, 'g', value, tags, sampleRate, cb);
  }

  increment(metric, tags, sampleRate, cb) {
    this._sendMetric(metric, 'c', 1, tags, sampleRate, cb);
  }

  incrementBy(metric, value = 1, tags, sampleRate, cb) {
    this._sendMetric(metric, 'c', value, tags, sampleRate, cb);
  }

  decrement(metric, tags, sampleRate, cb) {
    this._sendMetric(metric, 'c', -1, tags, sampleRate, cb);
  }

  decrementBy(metric, value, tags, sampleRate, cb) {
    this._sendMetric(metric, 'c', value || -1, tags, sampleRate, cb);
  }

  _sendMetric(metric, type, value, tags, sampleRate = 1, cb) {
    // Essential checkings
    if (sampleRate <= 0 || sampleRate > 1) {
      const errInvalidSampleRate = new Error('SampleRate should be within ( 0, 1 ]');
      if (cb)
        return cb(errInvalidSampleRate);
      else
        throw( errInvalidSampleRate );
    }
    if (typeof value !== 'number') {
      const errInvalidValue = new Error('Value should be number');
      if (cb) {
        return cb(errInvalidValue);
      }
      else {
        throw( errInvalidValue );
      }
    }

    let payload = [metric, ':', value, '|', type];

    if (sampleRate && sampleRate !== 1) {
      payload.push('|@' + sampleRate);
    }

    let tagsToSend = [];

    if (this.globalTags && Array.isArray(this.globalTags)) {
      tagsToSend = tagsToSend.concat(this.globalTags);
    }

    if (tags && Array.isArray(tags)) {
      tagsToSend = tagsToSend.concat(tags);
    }

    if (tagsToSend.length > 0) {
      payload.push('|#');
      payload = payload.concat(tagsToSend.join(','));
    }

    const encoded = new Buffer(payload.join(''));

    const args = [encoded, 0, encoded.length, this.port, this.host];
    if (cb) {
      args.push(cb);
    }
    this.socket.send.apply(this.socket, [encoded, 0, encoded.length, this.port, this.host, cb]);
  }
}

export default StatsD;
