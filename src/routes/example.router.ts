import { Router } from 'express';
import { ExampleController } from '../controllers';
import { wrapJsonApiController } from '../utils';

export interface ExampleRouterConfig {
  exampleController: ExampleController;
  Router: typeof Router;
}

/**
 * `ExampleRouter` for all the routes related to `/Example`
 */
export class ExampleRouter {
  private readonly ExampleController: ExampleController;

  private readonly Router: typeof Router;

  constructor(config: ExampleRouterConfig) {
    this.ExampleController = config.exampleController;
    this.Router = config.Router;
  }

  public buildExpressRouter(): Router {
    const router = this.Router();
    router.get(
      '/health-check',
      wrapJsonApiController(this.ExampleController.healthCheck.bind(this.ExampleController)),
    );
    return router;
  }
}
