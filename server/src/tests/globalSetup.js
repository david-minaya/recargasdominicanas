require('dotenv').config({ path: '.env.test' });
require('ts-node').register();

const { app } = require('../app');
const { createConnection } = require('./helpers/createConnection');
const { createOwnerUser } = require('../utils/createOwnerUser');
const { insertProviders } = require('../utils/insertProviders');
const { insertRolesAndPermissions } = require('../utils/insertRolesAndPermissions');

module.exports = async () => {

  const connection = await createConnection();

  await connection.dropDatabase();
  await connection.runMigrations();

  await insertRolesAndPermissions();
  await createOwnerUser();
  await insertProviders();
  
  const server = await startServer();

  globalThis.connection = connection;
  globalThis.server = server;
}

async function startServer() {
  return new Promise(resolve => {
    const server = app.listen(parseInt(process.env.PORT), process.env.HOST, () => { 
      resolve(server);
    });
  })
}
