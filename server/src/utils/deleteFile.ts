import { Storage } from '@google-cloud/storage';

export async function deleteFile(name?: string) {
  if (name) {
    await new Storage()
      .bucket(process.env.GCS_BUCKET!)
      .file(name)
      .delete();
  }
}
