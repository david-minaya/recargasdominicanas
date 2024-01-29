import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { APP_RELEASE_READ_CURRENT } from '../../constants/permissions';
import { permission } from '../../middlewares';
import { AppReleaseRepo } from '../../repositories/AppRelease.repo';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';

permission(APP_RELEASE_READ_CURRENT)
get('/current')
export const getCurrent = route(async () => {

  const appRelease = await AppReleaseRepo.getCurrent();

  if (!appRelease) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  } 

  return {
    ...appRelease,
    appVersion: {
      version: appRelease.version
    }
  }
});
