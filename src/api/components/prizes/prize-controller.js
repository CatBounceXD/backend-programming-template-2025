const prizesService = require('./prize-service');

async function getQuota(req, res, next) {
  try {
    const data = await prizesService.getPrizesQuota();
    return res.status(200).json({
      message: 'Informasi kuota hadiah',
      data,
    });
  } catch (error) {
    return next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const data = await prizesService.getMaskedWinners();
    return res.status(200).json({
      message: 'Daftar pemenang hadiah',
      data,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getQuota,
  getWinners,
};
