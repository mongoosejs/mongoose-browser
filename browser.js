'use strict';

require('mongoose/lib/driver').set(require('./driver'));

const mongoose = require('mongoose/lib/mongoose');
module.exports = mongoose;

if (typeof window !== 'undefined') {
  window.mongoose = mongoose;
}
