import { Router } from 'express';
import { appConfig } from './config/app.config';
import App from './app';
import { ExampleDao } from './repositories';
import { ExampleService } from './services';
import { ExampleController } from './controllers';
import { ExampleRouter } from './routes';
import logger from './utils/logger';

const exampleDao = new ExampleDao();

const exampleService = new ExampleService({ exampleDao });

const exampleController = new ExampleController({ exampleService });

const exampleRouter = new ExampleRouter({ Router, exampleController });

const app = new App(appConfig);
app.bootstrap().then(() => {
  logger.info('Application bootstrapped successfully');

  app.mount('/', exampleRouter.buildExpressRouter());
  app.listen();
  //app.logRoutes();
});

(['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach((sig) =>
  process.on(sig, () => app.shutdown(sig)),
);

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught Exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled Rejection');
  process.exit(1);
});
