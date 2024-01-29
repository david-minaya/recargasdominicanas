import { Api } from './api';
import { IBankAccount } from '../types';

export class SystemApi extends Api {

  public static async getBankAccounts() {
    return this.get<IBankAccount[]>('/system/bank-accounts');
  }
}
