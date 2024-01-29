import { Api } from './api';
import { IDeposit } from '../types/deposit.type';

export class DepositApi extends Api {

  public static async getDeposits() {
    return this.get<IDeposit[]>('/deposit');
  }

  public static async add(deposit: any) {
    return this.post<IDeposit>('/deposit', deposit);
  }

  public static async assign(id: number, businessId: number) {
    await this.post(`/deposit/${id}/assign`, { businessId });
  }
}
