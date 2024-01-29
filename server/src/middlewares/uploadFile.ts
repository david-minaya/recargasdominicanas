import multer from 'multer';
import { use } from '../utils/routeBuilder';
import { UploadFile } from '../utils/UploadFile';

const upload = multer({ storage: new UploadFile() });

export async function uploadFile(fieldName: string) {
  use(upload.single(fieldName));
}
