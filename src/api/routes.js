const express = require('express');

const usersRoute = require('./components/users/users-route');
const gachaRoute = require('./components/gacha/gacha-route');
const prizesRoute = require('./components/prizes/prize-route');

module.exports = () => {
  const router = express.Router();

  usersRoute(router);
  gachaRoute(router);
  prizesRoute(router);

  return router;
};
