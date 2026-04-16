const GachaHistory = require('../../../models/gacha-history-schema');
const Prize = require('../../../models/prize-schema');

// Menghitung jumlah gacha hari ini
async function countDailyGacha(email, today, tomorrow) {
  return GachaHistory.countDocuments({
    email,
    gachaDate: { $gte: today, $lt: tomorrow },
  });
}

// Mengambil data hadiah berdasarkan nama
async function getPrizeByName(name) {
  return Prize.findOne({ name });
}

// Menambah jumlah pemenang hadiah
async function incrementPrizeWinners(id) {
  return Prize.findByIdAndUpdate(id, {
    $inc: { currentWinners: 1 },
  });
}

// Menyimpan histori gacha
async function saveGachaHistory(email, name, isWin, prizeWon) {
  const history = new GachaHistory({
    email,
    name,
    isWin,
    prizeWon,
  });
  return history.save();
}

// (Bonus 1) Mengambil semua histori gacha berdasarkan email
async function getHistoryByEmail(email) {
  return GachaHistory.find({ email }).sort({ gachaDate: -1 }); // Urutkan dari yang terbaru
}

module.exports = {
  countDailyGacha,
  getPrizeByName,
  incrementPrizeWinners,
  saveGachaHistory,
  getHistoryByEmail,
};
