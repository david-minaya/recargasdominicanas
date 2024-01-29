import { ProviderApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

import { 
  IBankAccount, 
  IDeposit, 
  IPage, 
  IProvider, 
  IProviderConfig, 
  IProviderProduct,
  ISaleByDay,
  ISaleByMonth,
  ISaleByProduct,
  ITransaction 
} from '@recargas-dominicanas/core/types';

export interface ProviderState {
  id: number;
  provider: IProvider;
  externalBalance: number;
  salesByDay: ISaleByDay[];
  salesByMonth: ISaleByMonth[];
  salesByProduct: ISaleByProduct[];
  products?: IProviderProduct[];
  deposits?: IDeposit[];
  bankAccounts?: IBankAccount[];
  configs?: IProviderConfig[];
  transactionsPage?: IPage<ITransaction>;
}

class Store extends BaseStore<ProviderState> {

  constructor() {
    super('providersState');
  }

  getAll() {
    return this.findAll('provider');
  }

  getById(id: number) {
    return this.findById(id, 'provider');
  }

  getTransactionsPage(id: number) {
    return this.findById(id, 'transactionsPage');
  }

  getProducts(id: number) {
    return this.findById(id, 'products');
  }

  getBankAccounts(id: number) {
    return this.findById(id, 'bankAccounts');
  }

  getDeposits(id: number) {
    return this.findById(id, 'deposits');
  }

  getConfigs(id: number) {
    return this.findById(id, 'configs');
  }

  getExternalBalance(id: number) {
    return this.findById(id, 'externalBalance');
  }

  async fetchAll() {

    const providers = await ProviderApi.getAll();

    providers.forEach(provider => {

      if (this.exists(provider.id)) {
        this.update(provider.id, 'provider', provider);
        return;
      }

      this.add('provider', provider);
    });
  }

  async fetchById(id: number) {

    const provider = await ProviderApi.getById(id);

    if (this.exists(id)) {
      this.update(id, 'provider', provider);
      return;
    }

    this.add('provider', provider);
  }

  async fetchTransactions(id: number, page: number, size: number) {
    this.update(id, 'transactionsPage', await ProviderApi.getTransactions(id, page, size));
  }

  async fetchProducts(id: number) {
    this.update(id, 'products', await ProviderApi.getProviderProducts(id));
  }

  async fetchDeposits(id: number) {
    this.update(id, 'deposits', await ProviderApi.getDeposits(id));
  }

  async fetchBankAccounts(id: number) {
    this.update(id, 'bankAccounts', await ProviderApi.getBankAccounts(id));
  }

  async fetchConfigs(id: number) {
    this.update(id, 'configs', await ProviderApi.getConfigs(id));
  }

  async fetchExternalBalance(id: number) {
    this.update(id, 'externalBalance', await ProviderApi.getExternalBalance(id));
  }
}

export const ProviderStore = new Store();
