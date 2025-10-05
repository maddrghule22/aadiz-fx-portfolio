import { Request, Response, NextFunction } from 'express';
import cache from '../config/cache';

// Middleware to clear relevant caches after admin updates
export const clearCache = (req: Request, res: Response, next: NextFunction) => {
  // Clear all relevant caches when admin makes changes
  cache.delete('all_projects');
  cache.delete('featured_projects');
  cache.delete('all_testimonials');
  cache.delete('all_clients');
  cache.delete('all_services');
  
  next();
};

// Middleware to clear specific cache
export const clearSpecificCache = (cacheKey: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    cache.delete(cacheKey);
    next();
  };
};