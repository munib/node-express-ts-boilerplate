import pino from 'pino';
import { config } from 'dotenv';

const { LOG_LEVEL } = config().parsed || {};
const logLevel = LOG_LEVEL || 'info';
console.log(process.env.LOG_LEVEL);
const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  level: logLevel,
});
export default logger;
