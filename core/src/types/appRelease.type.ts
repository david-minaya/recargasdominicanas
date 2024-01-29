import { IReleaseNote } from './releaseNote.type';

export interface IAppRelease {
  id: number;
  version: string;
  path: string;
  filename: string;
  date: Date;
  published: boolean;
  releaseNotes: IReleaseNote[];

  // TODO: Legacy
  appVersion: {
    version: string;
  }
}
