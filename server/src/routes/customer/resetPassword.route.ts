import bcrypt from 'bcrypt';
import { Request } from 'express';
import { UNAUTHORIZED } from '../../constants/error-types';
import { ServerError } from '../../utils/serverError';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { password } from '../../utils/validators';
import { TempPassword } from '../../entities/tempPassword.entity';
import { Customer } from '../../entities/customer.entity';
import { CUSTOMER } from '../../constants/permissions';

permission(CUSTOMER);
validate({ password: password({ length: 6, letters: true, numbers: true }) })
post('/reset-password')
export const resetPassword = route(async req => {

  const customer = await Customer.findOne({
    where: { id: req.customer.id },
    relations: ['user', 'user.tempPassword']
  });
  
  const tempPassword = await TempPassword.findOne({ 
    where: { id: customer?.user.tempPassword?.id }
  });

  if (!customer || !tempPassword || tempPassword.expirationDate.getTime() < Date.now()) {
    await tempPassword?.remove();
    await logout(req);
    throw new ServerError(401, UNAUTHORIZED);
  }

  customer.password = await bcrypt.hash(req.body.password, 10);

  await customer.save();
  await tempPassword.remove();
});

function logout(req: Request) {
  return new Promise<void>((resolve, reject) => {
    req.session.destroy((err: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
