const express = require('express');
const prizesController = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  // Base URL: /prizes
  app.use('/prizes', route);

  // Endpoint: GET /prizes/quota (Bonus 2)
  route.get('/quota', prizesController.getQuota);

  // Endpoint: GET /prizes/winners (Bonus 3)
  route.get('/winners', prizesController.getWinners);
};
