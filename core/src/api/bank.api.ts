import { Api } from './api';
import { IBank } from '../types/bank.type';
import { IBankAccount } from '../types';

export class BankApi extends Api {

  public static async getAll() {
    return this.get<IBank[]>('/bank');
  }

  public static async getAccounts(id: number) {
    return this.get<IBankAccount[]>(`/bank/${id}/bank-accounts`);
  }

  public static async add(bank: any) {

    const formData = new FormData();
    formData.append('name', bank.name);
    formData.append('image', bank.image);

    return this.post<IBank>('/bank', formData);
  }

  public static async update(bank: any) {

    const formData = new FormData();
    formData.append('name', bank.name);
    formData.append('image', bank.image);

    return this.patch<IBank>(`/bank/${bank.id}`, formData);
  }
}
