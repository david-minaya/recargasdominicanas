import crypto from 'crypto';
import { AccessToken } from '../../entities/accessToken.entity';
import { ACCESS_TOKEN_UPDATE } from '../../constants/permissions';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(ACCESS_TOKEN_UPDATE)
validate({ id: number })
patch('/:id')
export const updateAccessToken = route(async req => {

  const accessToken = await AccessToken.findOneOrFail(req.params.id);

  accessToken.token = crypto.randomBytes(48).toString('hex');
  accessToken.expirationDate = new Date(Date.now() + 1000 * 60 * 60);

  const updatedAccessToken = await accessToken.save();

  return updatedAccessToken
});
