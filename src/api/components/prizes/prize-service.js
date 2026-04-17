const prizesRepository = require('./prize-repository');

async function getPrizesQuota() {
  const prizes = await prizesRepository.getAllPrizes();

  return prizes.map((prize) => ({
    nama_hadiah: prize.name,
    kuota_maksimal: prize.Quota,
    pemenang_saat_ini: prize.Winners,
    sisa_kuota: prize.Quota - prize.Winners,
  }));
}

function maskNameRandomly(name) {
  return name
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      return Math.random() > 0.4 ? '*' : char;
    })
    .join('');
}

async function getMaskedWinners() {
  const winners = await prizesRepository.getWinningHistory();
  const groupedWinners = {};

  winners.forEach((winner) => {
    if (!groupedWinners[winner.prizeWon]) {
      groupedWinners[winner.prizeWon] = [];
    }
    groupedWinners[winner.prizeWon].push(maskNameRandomly(winner.name));
  });

  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [prize, winnerList] of Object.entries(groupedWinners)) {
    result.push({ hadiah: prize, pemenang: winnerList });
  }

  return result;
}

module.exports = { getPrizesQuota, getMaskedWinners };
