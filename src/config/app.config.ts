import { AppConfig } from '../types/app-config.type';
import { config } from 'dotenv';
import logger from '../utils/logger';

/* Build configuration */

const envConfig = config().parsed || {};
const { PACKAGE_NAME, PACKAGE_VERSION, API_CONTEXT_PATH, API_VERSION, API_PORT, LOG_LEVEL, ENV } =
  envConfig;

const projectName = PACKAGE_NAME;
if (!projectName) {
  logger.error('The "PACKAGE_NAME" environment variable is mandatory! (suggested value: app)');
  process.exit(1);
}

const projectVersion = PACKAGE_VERSION;
if (!projectVersion) {
  logger.error('The "PACKAGE_VERSION" environment variable is mandatory! (suggested value: v1)');
  process.exit(1);
}

const apiContextPath = API_CONTEXT_PATH;
if (!apiContextPath) {
  logger.error('The "API_CONTEXT_PATH" environment variable is mandatory! (suggested value: api)');
  process.exit(1);
}
const apiVersion = API_VERSION;
if (!apiVersion) {
  logger.error('The "API_VERSION" environment variable is mandatory! (suggested value: v1)');
  process.exit(1);
}
const port = parseInt(API_PORT || '0', 10);
if (!port) {
  logger.error(
    'The "API_PORT" environment variable is missing or not a valid number! (suggested value: 3000)',
  );
  process.exit(1);
}

const logLevel = LOG_LEVEL || 'info';
const env = (ENV || 'development') as 'production' | 'development' | 'test';
if (!['production', 'development', 'test'].includes(env)) {
  logger.error(
    'The "ENV" environment variable is not valid! (valid values: production, development, test)',
  );
  process.exit(1);
}
export const appConfig: AppConfig = {
  projectName,
  projectVersion,
  apiContextPath,
  apiVersion,
  port,
};
