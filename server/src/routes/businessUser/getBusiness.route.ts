import { UNAUTHORIZED } from '../../constants/error-types';
import { BUSINESS_USER_READ } from '../../constants/permissions';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';

permission(BUSINESS_USER_READ)
get('/business')
export const getBusiness = route(async req => {

  if (!req.business) {
    throw new ServerError(401, UNAUTHORIZED);
  }

  return req.business;
});
