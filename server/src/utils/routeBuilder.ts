import { Request, RequestHandler, Response, Router } from 'express';
import { BaseRequest } from '../interfaces/baseRequest';

interface Config {
  middlewares: RequestHandler[];
  path?: string;
  code?: number;
  method: 'get' | 'post' | 'patch' | 'delete' | 'all';
  enableDebug: boolean;
  explicitRes: boolean;
}

let config: Config = {
  middlewares: [],
  path: undefined,
  code: undefined,
  method: 'all',
  enableDebug: false,
  explicitRes: false
}

export function use(middleware: RequestHandler) {
  config.middlewares.push(middleware);
}

export function status(code: number) {
  config.code = code;
}

export function get(path: string) {
  config.method = 'get';
  config.path = path;
}

export function post(path: string) {
  config.method = 'post';
  config.path = path;
}

export function patch(path: string) {
  config.method = 'patch'
  config.path = path;
}

export function remove(path: string) {
  config.method = 'delete';
  config.path = path
}

export function debug() {
  config.enableDebug = true;
}

export function explicitRes() {
  config.explicitRes = true;
}

export function route<T extends BaseRequest = Request>(handler: (req: T, res: Response) => any) {

  const {
    middlewares,
    path,
    code,
    method,
    enableDebug,
    explicitRes
  } = config;

  const router = Router({ mergeParams: true });

  const route = router[method](path!, ...middlewares, async (req: any, res) => {
    
    const result = await handler(req, res);

    if (enableDebug) {
      console.log('%o', result);
    }

    if (explicitRes) return;

    if (code) {
      res.status(code);
    }

    res.json(result);
  });

  config = {
    middlewares: [],
    path: undefined,
    code: undefined,
    method: 'all',
    enableDebug: false,
    explicitRes: false
  };

  return route;
}
