import { BUSINESS_USER_DELETE } from '../../constants/permissions';
import { BusinessUser } from '../../entities/businessUser.entity';
import { permission, validate } from '../../middlewares';
import { remove, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(BUSINESS_USER_DELETE)
validate({ id: number })
remove('/:id')
export const deleteBusinessUser = route(async req => {
  const businessUser = await BusinessUser.findOneOrFail(req.params.id);
  await businessUser.softRemove();
});
