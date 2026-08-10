const winston = require('winston');

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()} ${message}`;
    })
  ),
  transports: [
    // Console transport keeps logs visible in the terminal, Docker logs,
    // Kubernetes logs, and AWS CloudWatch when awslogs is enabled.
    new winston.transports.Console({ stderrLevels: [] }),
  ],
});

module.exports = logger;
