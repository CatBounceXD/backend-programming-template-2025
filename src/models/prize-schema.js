const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Quota: { type: Number, required: true },
  Winners: { type: Number, default: 0 },
});

module.exports = mongoose.model('Prize', prizeSchema);
