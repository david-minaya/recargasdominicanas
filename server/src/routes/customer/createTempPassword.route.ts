import crypto from 'crypto';
import { CUSTOMER_UPDATE } from '../../constants/permissions';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';
import { Customer } from '../../entities/customer.entity';
import { TempPassword } from '../../entities/tempPassword.entity';
import { Session } from '../../entities/session.entity';

permission(CUSTOMER_UPDATE)
validate({ id: number })
post('/:id/temp-password')
export const createTempPassword = route(async req => {
  
  const customer = await Customer.findOneOrFail({
    where: { id: req.params.id },
    relations: ['user', 'user.tempPassword']
  });

  const tempPassword = TempPassword.create({
    password: crypto.randomBytes(6).toString('hex'),
    expirationDate: new Date(Date.now() + 1000 * 60 * 60)
  });

  await Session.createQueryBuilder('session')
    .delete()
    .where('data->"$.userId" = :userId', { userId: customer.user.id })
    .execute();

  await customer.user.tempPassword?.remove();
  
  customer.password = null;
  customer.user.tempPassword = tempPassword;

  await customer.save();

  return customer;
});
