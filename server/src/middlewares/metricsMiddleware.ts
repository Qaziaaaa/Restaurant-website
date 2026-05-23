import { Request, Response, NextFunction } from 'express';
import { httpRequestCounter, httpResponseTimeHistogram } from '../monitoring/metrics';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    
    const route = req.route ? req.route.path : req.path;
    const labels = {
      method: req.method,
      route: route,
      status_code: res.statusCode.toString(),
    };

    httpRequestCounter.inc(labels);
    httpResponseTimeHistogram.observe(labels, durationInSeconds);
  });

  next();
};
