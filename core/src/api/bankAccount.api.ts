import { Api } from './api';
import { IDeposit, IPage } from '../types';
import { IWithdrawal } from '../types/withdrawal.type';

import { 
  IBankAccount, 
  IRegisterBalancePurchase, 
  IRegisterDeposit, 
  IRegisterTransfer, 
  IRegisterWithdrawal 
} from '../types/bankAccount.type';

export class BankAccountApi extends Api {

  static async getAll() {
    return this.get<IBankAccount[]>('/bank-account');
  }

  static async getById(id: number) {
    return this.get<IBankAccount>(`/bank-account/${id}`);
  }
  
  static async add(bankAccount: { bankId: number, name: string, accountNumber: string, userId?: number }) {
    return this.post<IBankAccount>('/bank-account', bankAccount);
  }

  static async update(id: number, bankAccount: { name: string, accountNumber: string }) {
    return this.patch<IBankAccount>(`/bank-account/${id}`, bankAccount);
  }

  static async getDeposits(id: number, page?: number, size?: number) {
    return this.get<IPage<IDeposit>>(`/bank-account/${id}/deposits`, {
      params: { page, size }
    });
  }

  static async getWithdrawals(id: number, page?: number, size?: number) {
    return this.get<IPage<IWithdrawal>>(`/bank-account/${id}/withdrawals`, {
      params: { page, size }
    });
  }

  public static async registerDeposit(id: number, deposit: IRegisterDeposit) {
    return this.post<IDeposit>(`/bank-account/${id}/register-deposit`, deposit);
  }

  public static async registerWithdrawal(id: number, withdrawal: IRegisterWithdrawal) {
    return this.post<IDeposit>(`/bank-account/${id}/register-withdrawal`, withdrawal);
  }

  public static async registerProfitWithdrawal(id: number, withdrawal: IRegisterWithdrawal) {
    return this.post<IDeposit>(`/bank-account/${id}/register-profit-withdrawal`, withdrawal);
  }

  public static async registerTransfer(id: number, transfer: IRegisterTransfer) {
    return this.post<IDeposit>(`/bank-account/${id}/register-transfer`, transfer);
  }

  public static async registerBalancePurchase(id: number, transfer: IRegisterBalancePurchase) {
    return this.post<IDeposit>(`/bank-account/${id}/register-balance-purchase`, transfer);
  }
}
