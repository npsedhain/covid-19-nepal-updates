const mongoose = require('mongoose');

const State = mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  active: {
    type: Number,
    required: true
  },
  confirmed: {
    type: Number,
    required: true
  },
  deaths: {
    type: Number,
    required: true
  },
  recovered: {
    type: Number,
    required: true
  },
  delta: {
    type: Object,
    required: true
  },
  lastupdatedtime: {
    type: String
  }
});

module.exports = mongoose.model('State', State);
