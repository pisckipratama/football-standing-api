const mongoose = require('mongoose');

const FootballSchema = mongoose.Schema({
  clubname: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  }
}, {
  timestamp: true
})

module.exports = mongoose.model('football', FootballSchema);