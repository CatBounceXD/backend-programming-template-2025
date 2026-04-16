const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  // Endpoint: POST /api/gacha (Untuk melakukan gacha)
  route.post('/', gachaController.roll);

  // Endpoint: GET /api/gacha/history (Untuk melihat histori - BONUS 1)
  route.get('/history', gachaController.getHistory);
};
