import multer from 'multer';
import { use } from '../utils/routeBuilder';
import { UploadApp } from '../utils/UploadApp';

const upload = multer({ storage: new UploadApp() });

export function uploadApp(fieldName: string) {
  use(upload.single(fieldName));
}
