// Paksa dotenv mencari file .env di direktori root
require('dotenv').config({ path: `${__dirname}/.env` });

const mongoose = require('mongoose');
const Prize = require('./src/models/prize-schema');

// Tambahkan pengecekan keamanan sebelum melakukan koneksi
if (!process.env.DB_CONNECTION) {
  console.error('FATAL ERROR: DB_CONNECTION tidak ditemukan di file .env!');
  process.exit(1);
}

const initialPrizes = [
  { name: 'Emas 10 gram', maxQuota: 1, currentWinners: 0 },
  { name: 'Smartphone X', maxQuota: 5, currentWinners: 0 },
  { name: 'Smartwatch Y', maxQuota: 10, currentWinners: 0 },
  { name: 'Voucher Rp100.000', maxQuota: 100, currentWinners: 0 },
  { name: 'Pulsa Rp50.000', maxQuota: 500, currentWinners: 0 },
];

async function seedDatabase() {
  try {
    // 1. Konek ke Database
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('Koneksi ke MongoDB berhasil.');

    // 2. Hapus data hadiah yang mungkin nyangkut sebelumnya
    await Prize.deleteMany({});
    console.log('Data hadiah lama dibersihkan.');

    // 3. Masukkan data hadiah baru
    await Prize.insertMany(initialPrizes);
    console.log('Data hadiah awal berhasil dimasukkan (Seeding Sukses)!');

    // 4. Tutup koneksi dan keluar
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Terjadi kesalahan saat seeding:', error);
    process.exit(1);
  }
}
seedDatabase();
