import express, { Application, RequestHandler, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorHandler, requestLogger, correlationId } from './middlewares';

import { AppConfig } from './types/app-config.type';
import logger from './utils/logger';

export default class App {
  private readonly expressApp: Application;

  private readonly expressRouter: Router;

  private readonly routePrefix: string;

  private readonly projectName: string;

  private readonly projectVersion: string;

  private readonly apiContextPath: string;

  private readonly apiContextVersion: string;

  private readonly port: number;

  constructor(config: AppConfig) {
    this.projectName = config.projectName;
    this.projectVersion = config.projectVersion;
    this.apiContextPath = config.apiContextPath;
    this.apiContextVersion = config.apiVersion;
    this.port = config.port;
    this.routePrefix = `/${this.apiContextPath}/${this.apiContextVersion}`;

    this.expressApp = express();
    this.expressRouter = express.Router();
  }

  private bootstrapCommonMiddlewares(): void {
    this.expressApp.use(helmet());
    this.expressApp.use(cors());
    this.expressApp.use(compression());
    this.expressApp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    this.expressApp.use(express.json());
    this.expressApp.use(correlationId);
    this.expressApp.use(requestLogger);
    this.expressApp.use(this.expressRouter); // <-- Register router after global middlewares
    this.expressApp.use(errorHandler);
  }

  public async bootstrap(): Promise<void> {
    this.expressRouter.get('/health', (req, res) => () => res.status(200).send('ok'));
    this.bootstrapCommonMiddlewares();
  }

  public mount(path: string, ...handlers: RequestHandler[]): void {
    logger.info(`Mounting ${this.routePrefix}${path} to express application`);
    this.expressRouter.use(`${this.routePrefix}${path}`, handlers);
  }

  public listen(): void {
    this.expressApp.listen(this.port, () => {
      logger.info(`${this.projectName} v${this.projectVersion} :: Listening on :${this.port}`);
    });
  }

  public shutdown(sig: NodeJS.Signals): void {
    logger.error(
      `Shutting down ${this.projectName} | ${this.projectVersion} :: Listening on :${this.port} due to ${sig}`,
    );
    // Add any cleanup logic here if needed
    process.exit(0);
  }
}
