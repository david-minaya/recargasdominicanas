import { IBank, IBankAccount } from '@recargas-dominicanas/core/types';
import { BankApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

interface BankState {
  id: number;
  bank: IBank;
  accounts: IBankAccount[];
}

class Store extends BaseStore<BankState> {

  constructor() {
    super('bankState');
  }

  getById(id: number) {
    return this.findById(id, 'bank');
  }

  getAll() {
    return this.findAll('bank');
  }

  getAccounts(id: number) {
    return this.findById(id, 'accounts');
  }

  async fetchAll() {

    const banks = await BankApi.getAll();

    banks.forEach(bank => {

      if (this.exists(bank.id)) {
        this.update(bank.id, 'bank', bank);
        return;
      }

      this.add('bank', bank);
    });
  }

  async fetchAccounts(id: number) {
    this.update(id, 'accounts', await BankApi.getAccounts(id));
  }
}

export const BankStore = new Store();
