const gachaRepository = require('./gacha-repository');

async function checkDailyLimit(email) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const count = await gachaRepository.countDailyGacha(email, today, tomorrow);
  return count < 5;
}

async function rollGacha(email, name) {
  const canPlay = await checkDailyLimit(email);

  if (!canPlay)
    throw new Error('Limit gacha harian telah tercapai (Maksimal 5 kali/hari)');

  const dropRates = {
    'Emas 10 gram': 0.0001,
    'Smartphone X': 0.0005,
    'Smartwatch Y': 0.001,
    'Voucher Rp100.000': 0.02,
    'Pulsa Rp50.000': 0.08,
  };

  const randomValue = Math.random();
  let cumulativeProbability = 0;
  let selectedPrizeName = null;

  Object.entries(dropRates).some(([prizeName, rate]) => {
    cumulativeProbability += rate;
    if (randomValue <= cumulativeProbability) {
      selectedPrizeName = prizeName;
      return true;
    }
    return false;
  });

  let isWin = false;
  let wonPrize = null;

  if (selectedPrizeName) {
    const prizeData = await gachaRepository.getPrizeByName(selectedPrizeName);
    if (prizeData && prizeData.currentWinners < prizeData.maxQuota) {
      isWin = true;
      wonPrize = selectedPrizeName;
      await gachaRepository.incrementPrizeWinners(prizeData.id);
    }
  }

  await gachaRepository.saveGachaHistory(email, name, isWin, wonPrize);
  return { isWin, prize: wonPrize };
}

// Hisotry
async function getUserHistory(email) {
  if (!email) throw new Error('Email wajib disertakan untuk melihat histori');

  const history = await gachaRepository.getHistoryByEmail(email);

  // Format data agar lebih bersih untuk dikembalikan ke client
  return history.map((item) => ({
    tanggal: item.gachaDate,
    status: item.isWin ? 'Menang' : 'Kalah',
    hadiah: item.prizeWon || 'Zonk',
  }));
}

module.exports = {
  checkDailyLimit,
  rollGacha,
  getUserHistory,
};
