module.exports = async () => {
  
  const connection = globalThis.connection;
  const server = globalThis.server;

  await connection.dropDatabase();
  await connection.close();
  server.close();

  process.exit();
}
