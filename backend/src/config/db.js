const mongoose = require('mongoose');
const logger = require('./logger');

function getConnectionUri() {
  const srvUri = process.env.MONGODB_URI;
  const seedHosts = process.env.MONGODB_SEED_HOSTS;
  const replicaSet = process.env.MONGODB_REPLICA_SET;

  if (!seedHosts || !replicaSet || !srvUri.startsWith('mongodb+srv://')) {
    return srvUri;
  }

  const parsedUri = new URL(srvUri);
  const credentials = parsedUri.username
    ? `${parsedUri.username}${parsedUri.password ? `:${parsedUri.password}` : ''}@`
    : '';
  const options = new URLSearchParams(parsedUri.search);

  options.set('tls', 'true');
  options.set('replicaSet', replicaSet);
  if (!options.has('authSource')) {
    options.set('authSource', 'admin');
  }

  return `mongodb://${credentials}${seedHosts}${parsedUri.pathname}?${options}`;
}

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  }

  const connectionUri = getConnectionUri();

  if (connectionUri !== process.env.MONGODB_URI) {
    logger.info('Using MongoDB seed-list connection because SRV DNS is unavailable');
  }

  await mongoose.connect(connectionUri, {
    // Avoid leaving the application apparently frozen when Atlas is
    // unreachable because of its IP access list or a network firewall.
    serverSelectionTimeoutMS: 10000,
  });
  logger.info('MongoDB connection established');
}

function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
}

module.exports = {
  connectDatabase,
  getDatabaseStatus,
  getConnectionUri,
};
