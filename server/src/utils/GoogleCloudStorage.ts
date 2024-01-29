import { Bucket, Storage } from '@google-cloud/storage';
import { Request } from 'express';

type File = Express.Multer.File;

export abstract class GoogleCloudStorage {

  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage();
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET!);
  }

  uploadFile(name: string, file: File, cb: (error?: any, info?: Partial<File>) => void) {
      
    const newFile = this.bucket.file(name);
    const writeStream = newFile.createWriteStream({ contentType: file.mimetype });
    
    file.stream.pipe(writeStream)
      .on('finish', () => cb(undefined, { filename: name, originalname: file.originalname }))
      .on('error', (err) => cb(err))
  }

  async _removeFile(req: Request, file: Express.Multer.File, cb: (error: Error | null) => void) {
    this.bucket.file(file.filename).delete()
      .then(() => cb(null))
      .catch((err) => cb(err));
  }
}
