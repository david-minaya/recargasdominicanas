import { createPool } from 'mysql2';
import { RateLimiterMySQL } from 'rate-limiter-flexible';

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  socketPath: process.env.DB_SOCKET_PATH
});

export function createRateLimiter(points: number, duration: number) {
  return new RateLimiterMySQL({
    storeClient: pool,
    dbName: process.env.DB_NAME,
    tableCreated: true,
    points,
    duration
  });
}
