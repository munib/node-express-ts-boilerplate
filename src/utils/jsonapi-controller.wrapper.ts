import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

/**
 * To be returned from `JsonApiController`.
 */
export interface JsonApiResponseEntity<T> {
  statusCode: number;
  msg?: string;
  headers?: { [headerName: string]: string };
  body: T;
}

/**
 * A controller that returns a `JsonApiResponseEntity` entity.
 */
export type JsonApiController<T> = (
  req: Request,
  res: Response,
) => Promise<JsonApiResponseEntity<T>>;

export const wrapJsonApiController = <T>(
  jsonApiController: JsonApiController<T>,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const jsonApiControllerAsync = async () => jsonApiController(req, res);
    jsonApiControllerAsync()
      .then((response: unknown) => {
        /* Don't do anything if the controller returns undefined
        because we assume the controller handled the response its self */
        if (response === undefined) {
          return;
        }

        /* Validate controller response */
        if (typeof response !== 'object' || !response) {
          throw new Error('Controller response must be a JsonApiResponseEntity object.');
        }
        const { statusCode, headers, body, msg } = response as JsonApiResponseEntity<T>;
        if (!('body' in response)) {
          throw new Error('Missing "body" in controller response.');
        }

        if (!statusCode) {
          throw new Error(
            'Missing "statusCode" in controller response.' +
              ' This is required to ensure developers think well about the statusCode they return.',
          );
        }

        if (headers && !Array.isArray(headers)) {
          throw new Error('The "headers" field in controller response must be an array.');
        }

        /* Forward response to express */
        if (headers) {
          Object.keys(headers).forEach((k) => res.header(k, headers[k]));
        }

        res.status(statusCode);
        res.send({
          status: {
            statusCode,
            msg: msg || getReasonPhrase(statusCode),
            timestamp: new Date().toISOString(),
          },
          data: body,
        });
      })
      .catch(next);
  };
};
