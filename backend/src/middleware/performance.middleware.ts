import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

// Performance monitoring middleware
export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request start
  logger.info(`${req.method} ${req.path} - Request started`);
  
  // Capture response finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Only log if headers haven't been sent yet
    if (!res.headersSent) {
      logger.info(`${req.method} ${req.path} - ${statusCode} - ${duration}ms`);
      
      // Log slow requests (over 1 second)
      if (duration > 1000) {
        logger.warn(`${req.method} ${req.path} - Slow request (${duration}ms)`);
      }
    }
  });
  
  next();
};

// Response time header middleware
export const responseTimeHeader = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  const originalSend = res.send;
  
  res.send = function(body) {
    const duration = Date.now() - start;
    res.setHeader('X-Response-Time', `${duration}ms`);
    return originalSend.call(this, body);
  };
  
  next();
};