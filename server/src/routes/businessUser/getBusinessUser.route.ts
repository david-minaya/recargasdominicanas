import { UNAUTHORIZED } from '../../constants/error-types';
import { BUSINESS_USER_READ } from '../../constants/permissions';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';

permission(BUSINESS_USER_READ)
get('/')
export const getBusinessUser = route(async req => {

  if (req.businessUser === undefined) {
    throw new ServerError(401, UNAUTHORIZED);
  }

  return req.businessUser;
});
