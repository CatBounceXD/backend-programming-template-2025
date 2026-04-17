const Prize = require('../../../models/prize-schema');
const GachaHistory = require('../../../models/gacha-history-schema');

async function getAllPrizes() {
  return Prize.find({});
}

async function getWinningHistory() {
  return GachaHistory.find({ isWin: true });
}

module.exports = { getAllPrizes, getWinningHistory };
