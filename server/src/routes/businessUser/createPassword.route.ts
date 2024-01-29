import bcrypt from 'bcrypt';
import { ACTIVATED } from '../../constants/business-user-state';
import { INVALID_TOKEN } from '../../constants/error-types';
import { AccessToken } from '../../entities/accessToken.entity';
import { BusinessUser } from '../../entities/businessUser.entity';
import { ServerError } from '../../utils/serverError';
import { validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { alphanumeric, string } from '../../utils/validators';

validate({ token: alphanumeric, password: string })
post('/create-password')
export const createPassword = route(async req => {

  const { token, password } = req.body;
  
  const accessToken = await AccessToken.findOne({ 
    where: { token },
    relations: ['user']
  });

  if (!accessToken || accessToken.expirationDate.getTime() < Date.now()) {
    throw new ServerError(404, INVALID_TOKEN);
  }

  const businessUser = await BusinessUser.findOneOrFail({
    where: { user: accessToken.user },
    relations: ['business', 'user']
  });

  businessUser.password = await bcrypt.hash(password, 10);
  businessUser.state = ACTIVATED;

  await businessUser.save();
  await accessToken.remove();

  req.session.userId = businessUser.user.id;
  req.session.role = 'businessUser';
});
