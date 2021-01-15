const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const config = require('config');

const env = process.env.NODE_ENV || 'test';
const logDir = 'logs';
const logLevel = config.get('logLevel');

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/service.%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: 30
  });

const logger = createLogger({
    level: env === 'test' ? [] : logLevel,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `TIMESTAMP|${info.timestamp}|LOGLEVEL|${info.level}|${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: env === 'test' ? [] : logLevel,
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `TIMESTAMP|${info.timestamp}|LOGLEVEL|${info.level}|${info.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
});

module.exports = logger