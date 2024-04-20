const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  playerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  sportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

const EnrollPlyr = mongoose.model('Enrolledplayer', enrollmentSchema);

module.exports = EnrollPlyr;
