export class AppError extends Error {
  public status: number;
  public code: string;
  public details?: unknown;

  constructor(message: string, status = 500, code = 'INTERNAL_SERVER_ERROR', details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
