const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { printf, timestamp, combine } = format;

const myFormat = printf(
  info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`,
);

const transport = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
});

module.exports = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [transport, new transports.Console()],
});


