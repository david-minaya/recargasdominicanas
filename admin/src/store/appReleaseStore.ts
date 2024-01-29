import { IAppRelease } from '@recargas-dominicanas/core/types';
import { AppReleaseApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

interface AppReleaseState {
  id: number;
  appRelease: IAppRelease;
}

export class Store extends BaseStore<AppReleaseState> {
  
  constructor() {
    super('appReleaseState');
  }

  getAll() {
    return this.findAll('appRelease');
  }

  async fetchAll() {
    const appReleases = await AppReleaseApi.getAll();
    this.set(appReleases.map(appRelease => ({ id: appRelease.id, 'appRelease': appRelease })));
  }
}

export const AppReleaseStore = new Store();
