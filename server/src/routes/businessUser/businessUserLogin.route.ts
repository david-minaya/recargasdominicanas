import bcrypt from 'bcrypt';
import { BusinessUser } from '../../entities/businessUser.entity';
import { ACTIVATED } from '../../constants/business-user-state';
import { ServerError } from '../../utils/serverError';
import { validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { string } from '../../utils/validators';
import { createRateLimiter } from '../../utils/rateLimiter';

import { 
  TOO_MANY_REQUESTS, 
  WRONG_USER_OR_PASSWORD 
} from '../../constants/error-types';

const rateLimiter = createRateLimiter(5, 60 * 24);

validate({ userName: string, password: string });
post('/login')
export const businessUserLogin = route(async (req, res) => {

  const { userName, password } = req.body;
  const rateLimit = await rateLimiter.get(userName);

  if (rateLimit && rateLimit.remainingPoints < 1) {
    res.set('Retry-After', `${rateLimit.msBeforeNext / 1000}`);
    throw new ServerError(429, TOO_MANY_REQUESTS);
  }
  
  const businessUser = await BusinessUser.createQueryBuilder('businessUser')
    .select('businessUser.password')
    .leftJoinAndSelect('businessUser.user', 'user')
    .where('businessUser.userName = :userName', { userName })
    .andWhere('businessUser.state = :state', { state: ACTIVATED })
    .getOne();
  
  if (!(businessUser?.password && await bcrypt.compare(password, businessUser.password))) {
    await rateLimiter.consume(req.body.userName);
    throw new ServerError(401, WRONG_USER_OR_PASSWORD);
  }

  await rateLimiter.delete(req.body.userName);

  req.session.userId = businessUser.user.id;
  req.session.role = 'businessUser';
});
