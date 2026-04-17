const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);
  route.post('/', gachaController.roll);
  route.get('/history', gachaController.getHistory);
};
