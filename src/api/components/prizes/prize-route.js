const express = require('express');
const prizesController = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/prizes', route);
  route.get('/quota', prizesController.getQuota);
  route.get('/winners', prizesController.getWinners);
};
