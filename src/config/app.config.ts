import { AppConfig } from '../types/app-config.type';
import convict, { InternalSchema, SchemaObj } from 'convict';
import logger from '../utils/logger';

const convictConfig = convict({
  projectName: {
    doc: 'PACKAGE_NAME will be used as the project name',
    format: function check(val) {
      if (!val) {
        throw new Error(
          'The "PACKAGE_NAME" environment variable is mandatory! (suggested value: app)',
        );
      }
    },
    default: '',

    required: true,
    env: 'PACKAGE_NAME',
  },
  projectVersion: {
    doc: 'The "PACKAGE_VERSION" environment variable is mandatory! (suggested value: 1.0.0)',
    format: String,
    default: '1.0.0',
    required: true,
    env: 'PACKAGE_VERSION',
  },
  apiContextPath: {
    doc: 'The "API_CONTEXT_PATH" environment variable is mandatory! (suggested value: api)',
    format: String,
    default: 'api',
    required: true,
    env: 'API_CONTEXT_PATH',
  },
  apiVersion: {
    doc: 'The "API_VERSION" environment variable is mandatory! (suggested value: v1)',
    format: String,
    default: 'v1',
    required: true,
    env: 'API_VERSION',
  },
  port: {
    doc: 'The "API_PORT" environment variable is missing or not a valid number! (suggested value: 3000)',
    format: 'port',
    default: 3000,
    env: 'API_PORT',
  },
  logLevel: {
    doc: 'The logging level',
    format: ['error', 'warn', 'info', 'debug'],
    default: 'info',
    env: 'LOG_LEVEL',
  },
  env: {
    doc: 'The application environmentThe "ENV" environment variable is not valid! (valid values: production, development, test)',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'ENV',
  },
});

// Validate strict values
try {
  convictConfig.validate({ allowed: 'strict' });
} catch (err) {
  logger.error(`Configuration validation failed: ${(err as any).message}`);
  process.exit(1);
}

export const appConfig: AppConfig = convictConfig.getProperties();
