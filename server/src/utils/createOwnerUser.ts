import bcrypt from 'bcrypt';
import { Admin } from '../entities/admin.entity';
import { OWNER } from '../constants/roles';

const OWNER_ID = 1;

const {
  OWNER_NAME,
  OWNER_EMAIL,
  OWNER_PASSWORD
} = process.env;

export async function createOwnerUser() {

  if (OWNER_EMAIL && OWNER_PASSWORD) {

    const owner = await Admin.findOne(OWNER_ID);

    if (owner) {

      await Admin.save(Admin.create({
        id: OWNER_ID,
        name: OWNER_NAME,
        email: OWNER_EMAIL,
        password: await bcrypt.hash(OWNER_PASSWORD, 10)
      }));

    } else {

      await Admin.save(Admin.create({
        id: OWNER_ID,
        name: OWNER_NAME,
        email: OWNER_EMAIL,
        password: await bcrypt.hash(OWNER_PASSWORD, 10),
        user: {
          role: { id: OWNER }
        }
      }));
    }
  }
}
