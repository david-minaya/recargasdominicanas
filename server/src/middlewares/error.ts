import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../utils/serverError';

export function error(err: Error, req: Request, res: Response, next: NextFunction) {

  if (process.env.NODE_ENV === 'development' && process.env.DEBUG === 'true') {
    console.log(err);
  }

  if (process.env.NODE_ENV === 'production') {
    console.error(JSON.stringify({
      severity: 'ERROR',
      date: req.date,
      message: (err as any)?.error?.message || err.message,
      stack: err.stack,
      error: (err as any)?.error?.error,
      httpRequest: {
        requestUrl: req.url,
        requestMethod: req.method,
        latency: `${((Date.now() - req.date.getTime()) / 1000).toFixed(2)}s`,
        query: req.query,
        body: req.body
      },
    }));
  }

  if (res.headersSent) {
    return next(err)
  }
  
  if (err instanceof ServerError) {

    res.status(err.code);
    res.send(err.message);

  } else {

    res.status(500);
    res.send('Internal Server Error');
  }
}
