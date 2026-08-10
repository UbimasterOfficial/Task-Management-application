const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const { getDatabaseStatus } = require('./config/db');
const logger = require('./config/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed by CORS'));
    },
  })
);

app.use(express.json());

// Morgan creates one simple log entry for every HTTP request.
app.use(
  morgan(':method :url :status :response-time ms', {
    stream: {
      write(message) {
        logger.http(message.trim());
      },
    },
  })
);

app.get('/health', (_req, res) => {
  const database = getDatabaseStatus();
  const healthy = database === 'connected';

  return res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    service: 'cloudtask-backend',
    version: process.env.APP_VERSION || '1.0.0',
    database,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/tasks', taskRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
