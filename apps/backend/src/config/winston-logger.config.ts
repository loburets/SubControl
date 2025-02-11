import * as winston from 'winston';
const isProduction = process.env.NODE_ENV === 'production';

export const winstonLoggerConfig = {
  transports: [
    new winston.transports.Console({
      level: isProduction ? 'warn' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `[${timestamp}] ${level}: ${message} ${context ? `[${JSON.stringify(context)}]` : ''}`;
        })
      ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: isProduction ? 'info' : 'debug',
    }),
  ],
};
