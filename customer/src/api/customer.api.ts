import { Api } from './api';

import {
  ICustomer,
  IBusiness, 
  IDeposit, 
  IPage, 
  ISalesReport, 
  ITransaction 
} from '@recargas-dominicanas/core/types';

class Customer extends Api {

  constructor() {
    super('/customer');
  }

  async getAuth() {
    return this.get<ICustomer>('/auth');
  }

  async getBusiness() {
    return this.get<IBusiness[]>('/business');
  }

  async getTransactions(id: number, params: { page?: number, size?: number, startDate?: string, endDate?: string }) {
    return this.get<IPage<ITransaction>>(`/business/${id}/transactions`, { params });
  }

  async exportTransactions(id: number, startDate?: string, endDate?: string) {
    return this.api.get<Blob>(`/business/${id}/export-transactions`, {
      responseType: 'blob', 
      params: {
        startDate,
        endDate
      }
    });
  }

  async getDeposits(id: number) {
    return this.get<IDeposit[]>(`/business/${id}/deposits`);
  }

  async getSalesReports(id: number) {
    return this.get<ISalesReport[]>(`/business/${id}/sales-reports`);
  }

  async login(docNumber: string, password: string) {
    return this.post('/login', { docNumber, password });
  }

  async resetPassword(password: string) {
    return this.post('/reset-password', { password });
  }
}

export const CustomerApi = new Customer();
