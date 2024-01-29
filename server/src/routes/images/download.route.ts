import { Storage } from '@google-cloud/storage';
import { notEmpty } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route, explicitRes } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { IMAGE_READ } from '../../constants/permissions';

permission(IMAGE_READ)
validate({ name: notEmpty })
explicitRes()
get('/:name')
export const download = route(async (req, res) => {

  try {
  
    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCS_BUCKET!);
    const file = bucket.file(req.params.name);
    const [metadata] = await file.getMetadata();
  
    res.setHeader('content-type', metadata.contentType);
    res.setHeader('content-length', metadata.size);
    res.setHeader('cache-control', 'max-age=31536000, private');
  
    file.createReadStream().pipe(res)
    
  } catch (err) {

    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }
});
