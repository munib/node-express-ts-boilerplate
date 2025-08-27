import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const correlationId = (req as any).correlationId;
    logger.info(
      { method: req.method, url: req.url, correlationId, status: res.statusCode, duration },
      'Request completed',
    );
  });
  next();
}
