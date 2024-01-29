import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { BusinessUser } from '../../entities/businessUser.entity';
import { BUSINESS_READ_BUSINESS_USERS } from '../../constants/permissions';
import { number } from '../../utils/validators';

permission(BUSINESS_READ_BUSINESS_USERS)
validate({ id: number })
get('/:id/users')
export const getBusinessUsers = route(async req => {
  return BusinessUser.createQueryBuilder('businessUser')
    .leftJoinAndSelect('businessUser.user', 'user')
    .leftJoinAndSelect('user.accessToken', 'accessToken')
    .where('businessUser.businessId = :id', { id: req.params.id })
    .getMany();
});
