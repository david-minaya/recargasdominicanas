module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'dist/entities/*.js'
      : 'src/entities/*.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/migrations/*.js'
      : 'src/migrations/*.ts'
  ],
  cli: { migrationsDir: 'src/migrations' },
  extra: {
    decimalNumbers: true,
    socketPath: process.env.DB_SOCKET_PATH
  }
}
