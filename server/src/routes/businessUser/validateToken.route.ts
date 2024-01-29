import { INVALID_TOKEN } from '../../constants/error-types';
import { AccessToken } from '../../entities/accessToken.entity';
import { BusinessUser } from '../../entities/businessUser.entity';
import { validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { alphanumeric } from '../../utils/validators';

validate({ token: alphanumeric })
get('/validate-token/:token')
export const validateToken = route(async req => {

  const accessToken = await AccessToken.findOne({ 
    where: { token: req.params.token },
    relations: ['user']
  });
  
  if (!accessToken || accessToken.expirationDate.getTime() < Date.now()) {
    throw new ServerError(404, INVALID_TOKEN)
  }

  return BusinessUser.createQueryBuilder('businessUser')
    .leftJoinAndSelect('businessUser.user', 'user')
    .leftJoinAndSelect('businessUser.business', 'business')
    .where('user.id = :id', { id: accessToken.user.id })
    .getOne();
});
