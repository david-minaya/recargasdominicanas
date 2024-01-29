import { CustomerApi } from '../api/customer.api';
import { BaseStore } from './BaseStore';

import { 
  IBusiness,
  ICustomer, 
  IDeposit, 
  IPage, 
  ISalesReport, 
  ITransaction 
} from '@recargas-dominicanas/core/types';

interface CustomerState {
  id: number;
  business: IBusiness[];
  customer: ICustomer;
  transactions: IPage<ITransaction>;
  deposits: IDeposit[];
  salesReports: ISalesReport[];
}

class Store extends BaseStore<CustomerState> {

  constructor() {
    super('customer');
  }

  get() {
    return this.findAll<ICustomer | undefined>(state => state[0]?.customer);
  }

  async fetch() {
    const customer = await CustomerApi.getAuth();
    this.upsert(customer.id, { customer });
  }
}

export const CustomerStore = new Store();
