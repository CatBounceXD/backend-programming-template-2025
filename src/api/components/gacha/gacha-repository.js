const GachaHistory = require('../../../models/gacha-history-schema');
const Prize = require('../../../models/prize-schema');

async function countDailyGacha(email, today, tomorrow) {
  return GachaHistory.countDocuments({
    email,
    gachaDate: { $gte: today, $lt: tomorrow },
  });
}

async function getPrizeByName(name) {
  return Prize.findOne({ name });
}

async function incrementPrizeWinners(id) {
  return Prize.findByIdAndUpdate(id, {
    $inc: { Winners: 1 },
  });
}

async function saveGachaHistory(email, name, isWin, prizeWon) {
  const history = new GachaHistory({
    email,
    name,
    isWin,
    prizeWon,
  });
  return history.save();
}

async function getHistoryByEmail(email) {
  return GachaHistory.find({ email }).sort({ gachaDate: -1 });
}

module.exports = {
  countDailyGacha,
  getPrizeByName,
  incrementPrizeWinners,
  saveGachaHistory,
  getHistoryByEmail,
};
