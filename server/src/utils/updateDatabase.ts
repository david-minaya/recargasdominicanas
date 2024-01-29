import { createConnection } from 'typeorm';
import { createOwnerUser } from './createOwnerUser';
import { insertProviders } from './insertProviders';
import { insertRolesAndPermissions } from './insertRolesAndPermissions';

(async () => {
  await createConnection();
  await insertRolesAndPermissions();
  await createOwnerUser();
  await insertProviders();
  console.log('Database updated');
  process.exit();
})();
