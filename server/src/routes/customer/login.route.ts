import bcrypt from 'bcrypt';
import { ServerError } from '../../utils/serverError';
import { validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { notEmpty } from '../../utils/validators';
import { createRateLimiter } from '../../utils/rateLimiter';
import { Customer } from '../../entities/customer.entity';
import { UNAUTHORIZED, TOO_MANY_REQUESTS } from '../../constants/error-types';

const rateLimiter = createRateLimiter(5, 60 * 24);

validate({ docNumber: notEmpty, password: notEmpty });
post('/login')
export const login = route(async (req, res) => {
  
  const { docNumber, password } = req.body;
  const rateLimit = await rateLimiter.get(docNumber);
  
  const customer = await Customer.createQueryBuilder('customer')
    .addSelect('customer.password')
    .leftJoinAndSelect('customer.user', 'user')
    .leftJoinAndSelect('user.tempPassword', 'tempPassword')
    .where('customer.docNumber = :docNumber', { docNumber })
    .getOne();

  if (rateLimit && rateLimit.remainingPoints < 1) {
    res.set('Retry-After', `${rateLimit.msBeforeNext / 1000}`);
    throw new ServerError(429, TOO_MANY_REQUESTS);
  }

  if (!customer || (!customer.password && !customer.user.tempPassword)) {
    await rateLimiter.consume(docNumber);
    throw new ServerError(401, UNAUTHORIZED);
  }

  if (customer.user.tempPassword && customer.user.tempPassword.expirationDate.getTime() < Date.now()) {
    await customer.user.tempPassword.remove();
    await rateLimiter.consume(docNumber);
    throw new ServerError(401, UNAUTHORIZED);
  }

  if (customer.user.tempPassword && customer.user.tempPassword.password !== password) {
    await rateLimiter.consume(docNumber);
    throw new ServerError(401, UNAUTHORIZED);
  }
  
  if (customer.password && !await bcrypt.compare(password, customer.password)) {
    await rateLimiter.consume(docNumber);
    throw new ServerError(401, UNAUTHORIZED);
  }

  await rateLimiter.delete(docNumber);

  req.session.userId = customer.user.id;
  req.session.role = 'customer';
});
