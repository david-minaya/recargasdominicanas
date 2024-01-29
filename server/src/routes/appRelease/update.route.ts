import { Not } from 'typeorm';
import { APP_RELEASE_PUBLISHED_ERROR, SMALLER_VERSION_ERROR, VERSION_ALREADY_EXISTS_ERROR } from '../../constants/error-types';
import { APP_RELEASE_UPDATE } from '../../constants/permissions';
import { AppRelease } from '../../entities/appRelease.entity';
import { ReleaseNote } from '../../entities/releaseNote.entity';
import { permission, uploadApp, validateWithFile } from '../../middlewares';
import { Validator } from '../../utils/mapSchema';
import { patch, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { file, json, number, optional, regex } from '../../utils/validators';

const validator: Validator = {
  id: number,
  version: [regex(/\d\.\d\.\d/), optional],
  app: [file, optional],
  releaseNotes: [json, optional]
};

permission(APP_RELEASE_UPDATE)
uploadApp('app')
validateWithFile(validator)
patch('/:id')
export const update = route(async ({ params, body }) => {
  
  const id = parseInt(params.id);
  const exists = await versionExists(body.version, id);
  const isSmaller = await versionIsSmaller(body.version, id);
  const appRelease = await AppRelease.findOneOrFail(id);

  if (exists) {
    throw new ServerError(409, VERSION_ALREADY_EXISTS_ERROR);
  }

  if (appRelease.published) {
    throw new ServerError(409, APP_RELEASE_PUBLISHED_ERROR);
  }

  if (isSmaller) {
    throw new ServerError(409, SMALLER_VERSION_ERROR);
  }

  if (body.releaseNotes) {
    await ReleaseNote.createQueryBuilder()
      .delete()
      .where('release_note.appReleaseId = :id', { id })
      .execute();
  }

  appRelease.version = body.version;
  appRelease.releaseNotes = JSON.parse(body.releaseNotes);
  
  await appRelease.save();
});

async function versionExists(version: string, id: number) {
  const exists = await AppRelease.findOne({ version, id: Not(id) });
  return exists !== undefined;
}

async function versionIsSmaller(version: string, id: number) {

  const lastRelease = await AppRelease.createQueryBuilder('appRelease')
    .where('appRelease.id != :id', { id })
    .orderBy('appRelease.date', 'DESC')
    .take(1)
    .getOneOrFail();

  const result = version.localeCompare(
    lastRelease.version, 
    undefined, 
    { numeric: true , sensitivity: 'base' }
  );
  
  return result <= 0;
}
