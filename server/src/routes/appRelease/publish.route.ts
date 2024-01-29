import { APP_RELEASE_PUBLISHED_ERROR, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { APP_RELEASE_UPDATE } from '../../constants/permissions';
import { AppRelease } from '../../entities/appRelease.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { number } from '../../utils/validators';

permission(APP_RELEASE_UPDATE)
validate({ id: number })
patch('/:id/publish')
export const publish = route(async ({ params }) => {
  
  const id = parseInt(params.id);
  const appRelease = await AppRelease.findOne(id);

  if (!appRelease) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  if (appRelease.published) {
    throw new ServerError(409, APP_RELEASE_PUBLISHED_ERROR);
  }

  appRelease.published = true;
  
  await appRelease.save();
});
