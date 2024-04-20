const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
  mastername: { type: String, required: true },
  masterpass: { type: String, required: true },
  position: { type: String, enum: ['Physical Director', 'Assistant Physical Director'], required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
});

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
