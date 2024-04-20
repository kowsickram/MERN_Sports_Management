const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  Std_name: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Reg_no: {
    type: String,
    required: true,
    unique: true
  },
  Dept_name: {
    type: String,
    required: true
  },
  Clg_name: {
    type: String,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Pass: {
    type: String,
    required: true
  },
  DateOfBirth: { 
    type: Date,
    required: true
  }
}, { timestamps: false });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
