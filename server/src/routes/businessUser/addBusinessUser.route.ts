import crypto from 'crypto';
import { BusinessUser } from '../../entities/businessUser.entity';
import { BUSINESS_USER_CREATE } from '../../constants/permissions';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { number, string } from '../../utils/validators';
import { BUSINESS_USER } from '../../constants/roles';

permission(BUSINESS_USER_CREATE)

validate({
  name: string,
  username: string,
  businessId: number
})

post('/')
export const addBusinessUser = route(async ({ body }) => {
  return BusinessUser.save(
    BusinessUser.create({
      name: body.name,
      userName: body.username,
      business: {
        id: body.businessId
      },
      user: {
        role: { id: BUSINESS_USER },
        accessToken: {
          token: crypto.randomBytes(48).toString('hex'),
          expirationDate: new Date(Date.now() + 1000 * 60 * 60),
        }
      }
    })
  );
});
