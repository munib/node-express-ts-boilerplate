import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

const CORRELATION_HEADER = 'x-correlation-id';

export function correlationId(req: Request, res: Response, next: NextFunction) {
  let correlationId = req.header(CORRELATION_HEADER);

  if (!correlationId) {
    correlationId = randomUUID();
  }

  // Attach to request and response for downstream use
  (req as any).correlationId = correlationId;
  res.setHeader(CORRELATION_HEADER, correlationId);

  next();
}
