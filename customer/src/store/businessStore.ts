import { BaseStore } from './BaseStore';
import { CustomerApi } from '../api/customer.api';

import { 
  IBusiness, 
  IDeposit, 
  IPage, 
  ISalesReport, 
  ITransaction 
} from '@recargas-dominicanas/core/types';

interface BusinessState {
  id: number;
  business: IBusiness;
  transactions: IPage<ITransaction>;
  deposits: IDeposit[];
  salesReports: ISalesReport[];
}

class Store extends BaseStore<BusinessState> {

  constructor() {
    super('business');
  }

  getAll() {
    return this.findAll(state => 
      state
        .map(({ business }) => business)
        .sort((b1, b2) => b2.id - b1.id)
    );
  }
  
  getById(id: number) {
    return this.findById(id, state => state.business);
  }

  getTransactionsPage(id: number) {
    return this.findById(id, state => state.transactions);
  }

  getDeposits(id: number) {
    return this.findById(id, state => state.deposits);
  }

  getSalesReports(id: number) {
    return this.findById(id, state => state.salesReports);
  }

  async fetchAll() {
    const business = await CustomerApi.getBusiness();
    business.forEach(business => this.upsert(business.id, { business }));
  }

  async fetchTransactions(id: number, params: { page?: number, size?: number, startDate?: string, endDate?: string }) {
    this.update(id, { transactions: await CustomerApi.getTransactions(id, params) });
  }

  async fetchDeposits(id: number) {
    this.update(id, { deposits: await CustomerApi.getDeposits(id) });
  }

  async fetchSalesReports(id: number) {
    this.update(id, { salesReports: await CustomerApi.getSalesReports(id) });
  }
}

export const BusinessStore = new Store();
