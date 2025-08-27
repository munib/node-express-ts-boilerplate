import { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { ExampleService } from '../services';
import { JsonApiResponseEntity } from '../utils';

export interface ExampleControllerConfig {
  exampleService: ExampleService;
}

/**
 * Controller for Example
 */
export class ExampleController {
  private readonly exampleService: ExampleService;

  /**
   * Constructor for `ExampleController` class
   * @param config - Injects dependencies into the object
   */
  constructor(config: ExampleControllerConfig) {
    this.exampleService = config.exampleService;
  }

  /**
   *Health check api
   * @param req - Express request object
   * @param res - Express response object
   * @returns success
   */
  public async healthCheck(
    request: Request,
    response: Response,
  ): Promise<JsonApiResponseEntity<any>> {
    return {
      statusCode: HttpStatusCodes.OK,
      body: 'success',
    };
  }
}
