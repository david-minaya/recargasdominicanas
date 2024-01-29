import { IAppRelease, IReleaseNote } from '../types';
import { formData } from '../utils/formData';
import { Api } from './api';

export class AppReleaseApi extends Api {

  static async getCurrent() {
    return this.get<IAppRelease>('/app-release/current');
  }

  static async getAll() {
    return this.get<IAppRelease[]>('/app-release');
  }

  static async add(version: string, app: File, releaseNotes: Partial<IReleaseNote>[]) {
    return this.post<IAppRelease>('/app-release', formData({
      version,
      releaseNotes: JSON.stringify(releaseNotes),
      app,
    }));
  }

  static async update(id: number, version: string, releaseNotes: Partial<IReleaseNote>[], app?: File) {
    return this.patch<IAppRelease>(`/app-release/${id}`, formData({
      version,
      releaseNotes: JSON.stringify(releaseNotes),
      app,
    }));
  }

  static async publish(id: number) {
    return this.patch<IAppRelease>(`/app-release/${id}/publish`);
  }
}
