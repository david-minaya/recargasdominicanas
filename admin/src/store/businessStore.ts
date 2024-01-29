import { BusinessApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

import { 
  IBusiness, 
  IBusinessUser, 
  IDeposit, 
  IPage, 
  ISalesReport, 
  ITransaction 
} from '@recargas-dominicanas/core/types';

interface BusinessState {
  id: number;
  business: IBusiness;
  businessUsers: IBusinessUser[];
  transactions: IPage<ITransaction>;
  deposits: IDeposit[];
  salesReports: ISalesReport[];
}

class Store extends BaseStore<BusinessState> {

  constructor() {
    super('businessState');
  }

  getAll() {
    return this.findAll('business').sort((b1, b2) => b2.id - b1.id);
  }
  
  getById(id: number) {
    return this.findById(id, 'business');
  }

  getTransactionsPage(id: number) {
    return this.findById(id, 'transactions');
  }

  getDeposits(id: number) {
    return this.findById(id, 'deposits');
  }

  getSalesReports(id: number) {
    return this.findById(id, 'salesReports');
  }

  getBusinessUsers(id: number) {
    return this.findById(id, 'businessUsers');
  }

  async fetchAll() {

    const business = await BusinessApi.getBusiness();

    business.forEach(business => {

      if (this.exists(business.id)) {
        this.update(business.id, 'business', business);
        return;
      }

      this.add('business', business);
    });
  }

  async fetchById(id: number) {

    const business = await BusinessApi.getBusinessById(id);
    
    if (this.exists(business.id)) {
      this.update(business.id, 'business', business);
      return;
    }

    this.add('business', business);
  }

  async fetchTransactions(id: number, page?: number, size?: number) {
    this.update(id, 'transactions', await BusinessApi.getTransactions(id, page, size));
  }

  async fetchDeposits(id: number) {
    this.update(id, 'deposits', await BusinessApi.getDeposits(id));
  }

  async fetchSalesReports(id: number) {
    this.update(id, 'salesReports', await BusinessApi.getSalesReports(id));
  }

  async fetchBusinessUsers(id: number) {
    this.update(id, 'businessUsers', await BusinessApi.getUsers(id));
  }
}

export const BusinessStore = new Store();
