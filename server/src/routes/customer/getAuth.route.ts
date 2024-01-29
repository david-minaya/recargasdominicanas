import { UNAUTHORIZED } from '../../constants/error-types';
import { CUSTOMER } from '../../constants/permissions';
import { TempPassword } from '../../entities/tempPassword.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';

permission(CUSTOMER)
get('/auth')
export const getAuth = route(async req => {

  if (!req.customer) {
    throw new ServerError(401, UNAUTHORIZED);
  }

  const tempPassword = await TempPassword.findOne({
    relations: ['user'],
    where: { user:{ id: req.session.userId } }
  });

  return {
    ...req.customer,
    tempPassword: tempPassword !== undefined
  }
});
