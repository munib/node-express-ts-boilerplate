export class ValidationError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message = 'Validation failed', details?: unknown) {
    super(message);
    this.status = 400;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
