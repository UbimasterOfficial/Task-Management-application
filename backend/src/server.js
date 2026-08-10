require('dotenv').config({ path: '../.env' });
const app = require('./app');
const { connectDatabase } = require('./config/db');
const logger = require('./config/logger');

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, '0.0.0.0', () => {
      logger.info(`CloudTask API started on port ${port}`);
      logger.info(`Application version: ${process.env.APP_VERSION || '1.0.0'}`);
    });
  } catch (error) {
    logger.error(`Application startup failed: ${error.message}`);
    process.exit(1);
  }
}

startServer();
