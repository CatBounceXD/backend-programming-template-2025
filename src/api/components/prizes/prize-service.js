const prizesRepository = require('./prize-repository');

// (Bonus 2) Menghitung sisa kuota hadiah
async function getPrizesQuota() {
  const prizes = await prizesRepository.getAllPrizes();

  return prizes.map((prize) => ({
    nama_hadiah: prize.name,
    kuota_maksimal: prize.maxQuota,
    pemenang_saat_ini: prize.currentWinners,
    sisa_kuota: prize.maxQuota - prize.currentWinners,
  }));
}

// Fungsi bantuan untuk menyensor nama secara acak (contoh: J*** *oe)
function maskNameRandomly(name) {
  return name
    .split('')
    .map((char) => {
      if (char === ' ') return ' '; // Jangan sensor spasi
      // Peluang 60% huruf diubah menjadi bintang
      return Math.random() > 0.4 ? '*' : char;
    })
    .join('');
}

// (Bonus 3) Mengambil daftar pemenang dan menyamarkan namanya
async function getMaskedWinners() {
  const winners = await prizesRepository.getWinningHistory();

  // Mengelompokkan pemenang berdasarkan hadiahnya
  const groupedWinners = {};

  winners.forEach((winner) => {
    if (!groupedWinners[winner.prizeWon]) {
      groupedWinners[winner.prizeWon] = [];
    }
    // Masukkan nama yang sudah disensor ke dalam kelompok hadiah
    groupedWinners[winner.prizeWon].push(maskNameRandomly(winner.name));
  });

  // Mengubah format objek menjadi array agar rapi saat dijadikan JSON
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [prize, winnerList] of Object.entries(groupedWinners)) {
    result.push({
      hadiah: prize,
      pemenang: winnerList,
    });
  }

  return result;
}

module.exports = {
  getPrizesQuota,
  getMaskedWinners,
};
