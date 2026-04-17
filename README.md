# Quiz Backend Programming - Gacha API

535250154 - Steven Pratama
Aplikasi backend API untuk sistem undian (Gacha) berbasis probabilitas berbobot (Weighted Probability). Setiap user memiliki limit gacha maksimal 5 kali per hari, dan sistem otomatis menjaga agar pemenang tidak melebihi kuota maksimal setiap hadiah.

## Preparation
1. Clone / download repository ini.
2. Ketik `npm install`
3. Ubah `.env` agar dapat connect ke MongoDB / gunakan milik saya
4. Jalankan server menggunakan dengan mengetik `npm run dev` atau `node src/index.js`.

---

## Dokumentasi
Berikut adalah daftar endpoint yang tersedia

### 1. Melakukan Gacha
Endpoint ini digunakan oleh user untuk memutar gacha. Maksimal 5 kali per hari per email.
* **Method:** `POST`
* **URL:** `/api/gacha`
* **Body Request (JSON):**
  ```json
  {
    "email": "string (wajib)",
    "name": "string (wajib)"
  }

### 2. Melihat History Gacha
Endpoint ini menampilkan daftar riwayat gacha milik seorang user beserta status dan waktu pelaksanaannya.
* **Method:** `GET`
* **URL:** `/api/gacha/history?email=budi@example.com`

### 3. Cek Sisa Kuota Hadiah
Endpoint ini menampilkan daftar seluruh hadiah yang tersedia, kuota maksimal, dan sisa kuota saat ini.
* **Method:** `GET`
* **URL:** `/api/prizes/quota`

### 4. Winner List
Endpoint ini menampilkan daftar pemenang yang dikelompokkan berdasarkan hadiah. Nama pemenang akan disensor secara acak untuk privasi (contoh: J*** *oe)
* **Method:** `GET`
* **URL:** `/api/prizes/winners`