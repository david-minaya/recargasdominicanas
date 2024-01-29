import { validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { numeric, optional, query } from '../../utils/validators';

validate({ version: [numeric, optional, query] })
get('/is-auth')
export const isAuth = route(req => {

  if (req.query.version === '2') {
    return {
      isAuth: req.session.userId !== undefined,
      role: req.session.role
    }
  }

  return req.session.userId !== undefined;
});
