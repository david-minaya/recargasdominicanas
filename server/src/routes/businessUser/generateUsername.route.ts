import { Business } from '../../entities/business.entity';
import { BusinessUser } from '../../entities/businessUser.entity';
import { generateUserName } from '../../utils/generateUserName';
import { number } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { BUSINESS_USER_CREATE } from '../../constants/permissions';

permission(BUSINESS_USER_CREATE)
validate({ id: number })
get('/:id/generate-username')
export const generateUsername = route(async req => {

  const business = await Business.findOneOrFail(req.params.id);
  const businessUsers = await BusinessUser.createQueryBuilder('businessUser')
    .leftJoin('businessUser.business', 'business')
    .where('business.id = :id', { id: req.params.id })
    .withDeleted()
    .getMany();

  return generateUserName(business.name, business.id, businessUsers.length);
});
