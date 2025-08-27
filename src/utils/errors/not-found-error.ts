export class NotFoundError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message = 'Resource not found', details?: unknown) {
    super(message);
    this.status = 404;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
