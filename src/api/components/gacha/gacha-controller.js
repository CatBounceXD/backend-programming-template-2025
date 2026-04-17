const gachaService = require('./gacha-service');

async function roll(req, res, next) {
  try {
    const { email, name } = req.body;

    if (!email || !name)
      return res.status(400).json({ error: 'Email dan nama wajib disertakan!' });

    const result = await gachaService.rollGacha(email, name);

    const message = result.isWin
      ? `Selamat! Anda memenangkan ${result.prize}.`
      : 'Maaf, Anda belum beruntung...';

    return res.status(200).json({
      message,
      data: result,
    });
  } catch (error) {
    if (error.message.includes('Limit gacha harian')) {
      return res.status(403).json({
        error: error.message,
      });
    }
    return next(error);
  }
}

// getHis
async function getHistory(req, res, next) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: 'Email harus disertakan! (contoh: ?email=budi@email.com)',
      });
    }

    const historyData = await gachaService.getUserHistory(email);

    return res.status(200).json({
      message: `Histori gacha untuk ${email}`,
      data: historyData,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { roll, getHistory };
