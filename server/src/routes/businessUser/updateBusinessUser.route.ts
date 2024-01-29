import { BusinessUser } from '../../entities/businessUser.entity';
import { ACTIVATED, DISABLED } from '../../constants/business-user-state';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { number, string, optional, option } from '../../utils/validators';
import { BUSINESS_USER_UPDATE } from '../../constants/permissions';

permission(BUSINESS_USER_UPDATE)

validate({
  id: number,
  name: [string, optional],
  state: [option(ACTIVATED, DISABLED), optional]
})

patch('/:id')
export const updateBusinessUser = route(async req => {
  await BusinessUser.update(req.params.id, req.body);
});
