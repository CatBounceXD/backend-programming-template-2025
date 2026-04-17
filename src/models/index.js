const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

if (!config.database || !config.database.connection) {
  logger.fatal('Database configuration is missing in core/config.js');
  process.exit(1);
}

const rawConnection = config.database.connection;
const dbName = config.database.name;

const baseUri = rawConnection.includes('.net:27017/')
  ? `${rawConnection.split('.net:27017/')[0]}.net:27017/`
  : rawConnection;

const dbUri = baseUri.endsWith('/')
  ? `${baseUri}${dbName}`
  : `${baseUri}/${dbName}`;

mongoose
  .connect(dbUri, {
    ssl: true,
    authSource: 'admin',
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    logger.info(`Successfully connected to MongoDB: ${dbName}`);
  })
  .catch((err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

const db = mongoose.connection;
const dbExports = { db };

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
