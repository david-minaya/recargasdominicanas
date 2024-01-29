import { Admin } from '../../entities/admin.entity';
import { ADMIN_READ } from '../../constants/permissions';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { UNAUTHORIZED } from '../../constants/error-types';

permission(ADMIN_READ)
get('/')
export const getAdmin = route(async req => {

  if (!req.admin) {
    throw new ServerError(401, UNAUTHORIZED);
  }

  return Admin.findOne(req.admin.id);
});
