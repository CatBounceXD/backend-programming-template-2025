const gachaService = require('./gacha-service');

async function roll(req, res, next) {
  try {
    // 1. Ekstrak data dari body request
    const { email, name } = req.body;

    // 2. Validasi input dasar
    if (!email || !name) {
      return res.status(400).json({
        error: 'Email dan nama wajib disertakan di dalam body request.',
      });
    }

    // 3. Panggil service layer untuk memproses gacha
    const result = await gachaService.rollGacha(email, name);

    // 4. Susun pesan respons yang dinamis
    const message = result.isWin
      ? `Selamat! Anda berhasil memenangkan ${result.prize}.`
      : 'Maaf, Anda belum beruntung kali ini. Jangan menyerah!';

    // 5. Kembalikan response sukses ke client
    return res.status(200).json({
      message,
      data: result,
    });
  } catch (error) {
    // Tangkap error spesifik dari service (Limit harian tercapai)
    if (error.message.includes('Limit gacha harian')) {
      return res.status(403).json({
        error: error.message,
      });
    }

    // Lempar error lain (seperti masalah database) ke error handler bawaan template
    return next(error);
  }
}

// getHis
async function getHistory(req, res, next) {
  try {
    // Kita ambil email dari query parameter URL (contoh: /gacha/history?email=budi@example.com)
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error:
          'Email harus disertakan sebagai query parameter (contoh: ?email=budi@email.com)',
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

module.exports = {
  roll,
  getHistory,
};
