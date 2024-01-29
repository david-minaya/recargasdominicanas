import { Api } from './api';

type Auth = {
  isAuth: boolean;
  role: 'admin' | 'customer' | 'businessUser'
}

export class AuthApi extends Api {

  public static async isAuth(params?: { version?: number }) {
    return this.get<Auth>('/auth/is-auth', { params });
  }

  public static async logout() {
    await this.post('/auth/logout');
  }
}
