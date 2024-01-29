import crypto from 'crypto';
import { Request } from 'express';
import { GoogleCloudStorage } from './GoogleCloudStorage';

type File = Express.Multer.File;

export class UploadFile extends GoogleCloudStorage {

  async _handleFile(req: Request, file: File, cb: (error?: any, info?: Partial<File>) => void) {
    this.uploadFile(await this.generateName(), file, cb);
  }

  private generateName() {
    return new Promise<string>((resolve, rejects) => {
      crypto.randomBytes(12, (err, raw) => {
        err ? rejects() : resolve(raw.toString('hex'));
      });
    });
  }
}
