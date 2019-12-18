const SampleModel = require('../models/sample');

let samples = {};
let counter = 0;

/* static sample service class */
class SampleService {
  static create(data) {
    let sample = new SampleModel(data.message, data.status, data.something);

    sample.uid = 'c' + counter++;

    samples[sample.uid] = sample;

    return sample;
  }

  static retrieve(uid) {
    if (samples[uid] != null) {
      return samples[uid];
    } else {
      throw new Error('Unable to retrieve a sample by (uid:' + uid + ')');
    }
  }

  static update(uid, data) {
    if (samples[uid] != null) {
      const sample = samples[uid];

      Object.assign(sample, data);
    } else {
      throw new Error('Unable to retrieve a sample by (uid:' + cuid + ')');
    }
  }

  static delete(uid) {
    if (samples[uid] != null) {
      delete samples[uid];
    } else {
      throw new Error('Unable to retrieve a sample by (uid:' + cuid + ')');
    }
  }
}

module.exports = SampleService;
