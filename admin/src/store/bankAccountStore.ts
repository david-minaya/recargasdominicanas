import { IBankAccount, IDeposit, IPage } from '@recargas-dominicanas/core/types';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';
import { IWithdrawal } from '@recargas-dominicanas/core/types/withdrawal.type';

interface State {
  id: number;
  bankAccount: IBankAccount;
  deposits?: IPage<IDeposit>;
  withdrawals?: IPage<IWithdrawal>;
}

class Store extends BaseStore<State> {

  constructor() {
    super('bankAccounts');
  }

  getAll() {
    return this.findAll('bankAccount');
  }

  getById(id: number) {
    return this.findById(id, 'bankAccount');
  }

  getDeposits(id: number) {
    return this.findById(id, 'deposits');
  }

  getWithdrawals(id: number) {
    return this.findById(id, 'withdrawals');
  }

  async fetchAll() {

    const bankAccounts = await BankAccountApi.getAll();

    bankAccounts.forEach(bankAccount => {

      if (this.exists(bankAccount.id)) {
        this.update(bankAccount.id, 'bankAccount', bankAccount);
        return;
      }

      this.add('bankAccount', bankAccount);
    });
  }

  async fetchById(id: number) {

    const bankAccount = await BankAccountApi.getById(id);

    if (this.exists(bankAccount.id)) {
      this.update(bankAccount.id, 'bankAccount', bankAccount);
      return;
    }

    this.add('bankAccount', bankAccount);
  }

  async fetchDeposits(id: number, page: number, size: number) {
    this.update(id, 'deposits', await BankAccountApi.getDeposits(id, page, size));
  }

  async fetchWithdrawals(id: number, page: number, size: number) {
    this.update(id, 'withdrawals', await BankAccountApi.getWithdrawals(id, page, size));
  }
}

export const BankAccountStore = new Store();
