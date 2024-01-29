import { Api } from './api';

import { 
  IBankAccount, 
  IDeposit, 
  IPage, 
  IProvider, 
  IProviderConfig, 
  IProviderProduct, 
  ISales, 
  ISaleByDay, 
  ISaleByMonth, 
  ISaleByProduct,
  ITransaction, 
  IProviderRegisterDeposit
} from '../types';

export class ProviderApi extends Api {
  
  static async getAll() {
    return this.get<IProvider[]>('/providers');
  }

  static async getById(id: number) {
    return this.get<IProvider>(`/providers/${id}`);
  }

  static async getBankAccounts(id: number) {
    return this.get<IBankAccount[]>(`/providers/${id}/bank-accounts`);
  }

  static async getProviderProducts(id: number) {
    return this.get<IProviderProduct[]>(`/providers/${id}/provider-products`);
  }

  static async getDeposits(id: number) {
    return this.get<IDeposit[]>(`/providers/${id}/deposits`);
  }

  static async getTransactions(id: number, page?: number, size?: number) {
    return this.get<IPage<ITransaction>>(`/providers/${id}/transactions`, {
      params: { page, size }
    });
  }

  public static async getSales(id: number, startDate: Date, endDate: Date) {
    return this.get<ISales>(`/providers/${id}/sales`, { params: { startDate, endDate } });
  }

  public static async getSalesByDay(id: number, startDate: Date, endDate: Date) {
    return this.get<ISaleByDay[]>(`/providers/${id}/sales-by-day`, { params: { startDate, endDate } });
  }

  public static async getSalesByMonth(id: number, startDate: Date, endDate: Date) {
    return this.get<ISaleByMonth[]>(`/providers/${id}/sales-by-month`, { params: { startDate, endDate } });
  }

  public static async getSalesByProduct(id: number, startDate: Date, endDate: Date) {
    return this.get<ISaleByProduct[]>(`/providers/${id}/sales-by-products`, { params: { startDate, endDate } });
  }

  public static async getExternalBalance(id: number) {
    return this.get<number>(`/providers/${id}/external-balance`);
  }

  static async update(id: number, enabled: boolean) {
    await this.patch(`/providers/${id}`, { enabled });
  }

  static async registerDeposit(id: number, deposit: IProviderRegisterDeposit) {
    await this.post(`/providers/${id}/register-deposit`, deposit);
  }

  static async addConfig(id: number, name: string, value: string) {
    return this.post<IProviderConfig>(`/providers/${id}/configs`, { name, value });
  }

  static async getConfigs(id: number) {
    return this.get<IProviderConfig[]>(`/providers/${id}/configs`);
  }

  static async updateConfig(id: number, name: string, value: string) {
    return this.patch<IProviderConfig>(`/providers/configs/${id}`, { name, value });
  }

  static async deleteConfig(id: number) {
    return this.remove(`/providers/configs/${id}`);
  }
}
