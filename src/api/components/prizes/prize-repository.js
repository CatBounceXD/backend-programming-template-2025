const Prize = require('../../../models/prize-schema');
const GachaHistory = require('../../../models/gacha-history-schema');

// Mengambil semua data daftar hadiah
async function getAllPrizes() {
  return Prize.find({});
}

// Mengambil histori gacha yang statusnya menang saja
async function getWinningHistory() {
  return GachaHistory.find({ isWin: true });
}

module.exports = {
  getAllPrizes,
  getWinningHistory,
};
