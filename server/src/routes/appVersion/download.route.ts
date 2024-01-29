import { permission } from '../../middlewares';
import { explicitRes, get, route } from '../../utils/routeBuilder';
import { Storage } from '@google-cloud/storage';
import { ServerError } from '../../utils/serverError';
import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { APP_RELEASE_DOWNLOAD } from '../../constants/permissions';
import { AppReleaseRepo } from '../../repositories/AppRelease.repo';

permission(APP_RELEASE_DOWNLOAD)
explicitRes()
get('/download')
export const download = route(async (req, res) => {

  try {

    const appRelease = await AppReleaseRepo.getCurrent();

    if (!appRelease) {
      throw new ServerError(404, NOT_FOUND_EXCEPTION);
    }

    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCS_BUCKET!);
    const file = bucket.file(appRelease.path);
    const [metadata] = await file.getMetadata();
  
    res.setHeader('content-type', metadata.contentType);
    res.setHeader('content-length', metadata.size);
  
    file.createReadStream().pipe(res)
    
  } catch (err) {

    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }
});
