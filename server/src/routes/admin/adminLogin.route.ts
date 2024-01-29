import bcrypt from 'bcrypt';
import { Admin } from '../../entities/admin.entity';
import { validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { email, string } from '../../utils/validators';
import { createRateLimiter } from '../../utils/rateLimiter';

import { 
  INTERNAL_SERVER_ERROR,
  TOO_MANY_REQUESTS, 
  WRONG_EMAIL_OR_PASSWORD 
} from '../../constants/error-types';

const rateLimiter = createRateLimiter(3, 60 * 24);

validate({ email: email, password: string })
post('/login')
export const adminLogin = route(async (req, res) => {

  if (!req.ip) {
    throw new ServerError(500, INTERNAL_SERVER_ERROR)
  }

  const rateLimit = await rateLimiter.get(req.ip);

  if (rateLimit && rateLimit.remainingPoints < 1) {
    res.set('Retry-After', `${rateLimit.msBeforeNext / 1000}`);
    throw new ServerError(429, TOO_MANY_REQUESTS);
  }

  const { email, password } = req.body;

  const admin = await Admin.createQueryBuilder('admin')
    .select('admin.password')
    .leftJoinAndSelect('admin.user', 'user')
    .where('admin.email = :email', { email })
    .getOne();

  if (!(admin && await bcrypt.compare(password, admin.password))) {
    await rateLimiter.consume(req.ip);
    throw new ServerError(401, WRONG_EMAIL_OR_PASSWORD);
  }

  await rateLimiter.delete(req.ip);
  
  req.session.userId = admin.user.id;
  req.session.role = 'admin';
});
