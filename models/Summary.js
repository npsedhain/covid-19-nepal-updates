const mongoose = require('mongoose');

const Summary = mongoose.Schema({
  confirmeddelta: {
    type: Number,
    required: true
  },
  deceaseddelta: {
    type: Number,
    required: true
  },
  recovereddelta: {
    type: Number,
    required: true
  },
  statesdelta: {
    type: Number,
    required: true
  },
  lastupdatedtime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Summary', Summary);
