const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.LOGG_LEVEL ? process.env.LOGG_LEVEL : 'info',
  timestamp: true,
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

module.exports = logger;