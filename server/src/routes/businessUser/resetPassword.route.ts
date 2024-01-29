import crypto from 'crypto';
import { NOT_ACTIVATED } from '../../constants/business-user-state';
import { BUSINESS_USER_UPDATE } from '../../constants/permissions';
import { AccessToken } from '../../entities/accessToken.entity';
import { BusinessUser } from '../../entities/businessUser.entity';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(BUSINESS_USER_UPDATE)
validate({ id: number })
post('/:id/reset-password')
export const resetPassword = route(async req => {
  
  const businessUser = await BusinessUser.findOneOrFail({
    where: { id: req.params.id },
    relations: ['user']
  });

  const accessToken = AccessToken.create({
    token: crypto.randomBytes(48).toString('hex'),
    expirationDate: new Date(Date.now() + 1000 * 60 * 60)
  });

  businessUser.password = null;
  businessUser.state = NOT_ACTIVATED;
  businessUser.user.accessToken = accessToken;

  await businessUser.save();

  return businessUser;
});
