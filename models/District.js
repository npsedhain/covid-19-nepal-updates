const mongoose = require('mongoose');

const District = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
  lastupdatedtime: {
    type: String
  }
});

module.exports = mongoose.model('District', District);
