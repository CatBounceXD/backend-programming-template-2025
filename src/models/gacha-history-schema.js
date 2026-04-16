const mongoose = require('mongoose');

const gachaHistorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  gachaDate: { type: Date, default: Date.now },
  isWin: { type: Boolean, required: true },
  prizeWon: { type: String, default: null },
});

module.exports = mongoose.model('GachaHistory', gachaHistorySchema);
