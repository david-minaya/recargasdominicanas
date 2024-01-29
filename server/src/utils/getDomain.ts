import { Request } from 'express';

export function getDomain(req: Request) {
  const url = req.headers.origin || req.headers.referer;
  return url ? new URL(url).hostname : undefined;
}
