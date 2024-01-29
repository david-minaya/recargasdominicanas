import { createConnection as create } from 'typeorm';

export async function createConnection() {
  return create({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    extra: {
      decimalNumbers: true
    }
  });
}
