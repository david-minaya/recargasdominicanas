import { Api } from './api';
import { IAdmin } from '../types';

export class AdminApi extends Api {

  public static async login(email: string, password: string) {
    return this.post('/admin/login', { email, password });
  }

  public static async getAdmin() {
    return this.get<IAdmin>('/admin');
  }
}
