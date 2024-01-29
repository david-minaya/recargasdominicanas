import { SMALLER_VERSION_ERROR, VERSION_ALREADY_EXISTS_ERROR } from '../../constants/error-types';
import { APP_RELEASE_CREATE } from '../../constants/permissions';
import { AppRelease } from '../../entities/appRelease.entity';
import { permission, uploadApp, validateWithFile } from '../../middlewares';
import { AppReleaseRepo } from '../../repositories/AppRelease.repo';
import { Validator } from '../../utils/mapSchema';
import { post, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { file, json, regex } from '../../utils/validators';

const validator: Validator = {
  version: regex(/\d\.\d\.\d/),
  app: file,
  releaseNotes: json
};

permission(APP_RELEASE_CREATE)
uploadApp('app')
validateWithFile(validator)
post('/')
export const add = route(async ({ body, file }) => {

  const versionExists = await AppRelease.findOne({ version: body.version });
  const versionIsSmaller = await AppReleaseRepo.versionIsSmaller(body.version);

  if (versionExists) {
    throw new ServerError(409, VERSION_ALREADY_EXISTS_ERROR);
  }

  if (versionIsSmaller) {
    throw new ServerError(409, SMALLER_VERSION_ERROR);
  }

  return await AppRelease.save(
    AppRelease.create({
      version: body.version,
      filename: file?.originalname,
      path: file?.filename,
      date: new Date(),
      releaseNotes: JSON.parse(body.releaseNotes),
    })
  );
});
