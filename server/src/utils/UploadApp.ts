import { Request } from 'express';
import { GoogleCloudStorage } from './GoogleCloudStorage';

type File = Express.Multer.File;

export class UploadApp extends GoogleCloudStorage {
 
  _handleFile(req: Request, file: File, cb: (error?: any, info?: Partial<File>) => void) {
    this.uploadFile(`app_versions/${req.body.version}`, file, cb);
  }
}
