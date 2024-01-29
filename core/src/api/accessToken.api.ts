import { Api } from './api';
import { IAccessToken } from '../types/accessToken.type';

export class AccessTokenApi extends Api {

  public static async update(id: number) {
    return this.patch<IAccessToken>(`/access-token/${id}`);
  }
}
