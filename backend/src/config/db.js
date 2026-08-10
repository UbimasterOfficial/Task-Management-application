const mongoose = require('mongoose');
const logger = require('./logger');

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  logger.info('MongoDB connection established');
}

function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
}

module.exports = {
  connectDatabase,
  getDatabaseStatus,
};
