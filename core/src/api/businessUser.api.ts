import { Api } from './api';

import {
  IPage,
  IBusiness, 
  IBusinessUser, 
  ISalesReport, 
  ITransaction, 
  ITransactionGroups 
} from '../types';

export class BusinessUserApi extends Api {

  public static async login(userName: string, password: string) {
    return this.post('/business-user/login', { userName, password });
  }

  public static async getBusinessUser() {
    return this.get<IBusinessUser>('/business-user');
  }

  public static async getBusiness() {
    return this.get<IBusiness>('/business-user/business');
  }

  public static async getTransactions(page?: number, size?: number) {
    return this.get<IPage<ITransactionGroups>>('/business-user/transactions', {
      params: { page, size }
    });
  }

  public static async getLastTopup() {
    return this.get<ITransaction>('/business-user/last-topup');
  }

  public static async getSalesReports(page?: number, size?: number) {
    return this.get<IPage<ISalesReport>>('/business-user/sales-reports', {
      params: { page, size }
    });
  }

  public static async sendTransaction(productId: number, phone: string, amount: number) {
    return this.post<ITransaction>('/business-user/send-transaction', {
      productId, phone, amount,
    });
  }

  static async cancelTransaction(id: number) {
    return this.post(`/business-user/cancel-transaction/${id}`);
  }

  public static async validateToken(token: string) {
    return this.get<IBusinessUser>(`/business-user/validate-token/${token}`);
  }

  public static async createPassword(token: string, password: string) {
    await this.post('/business-user/create-password', { token, password });
  }

  public static async getNewUserName(id: number) {
    return this.get<string>(`/business-user/${id}/generate-username`);
  }

  public static async add(businessId: number, username: string, name: string) {
    return this.post<IBusinessUser>('/business-user', {
      businessId, username, name
    });
  }

  public static async rename(id: number, name: string) {
    await this.patch(`/business-user/${id}`, { name });
  }

  public static async enable(id: number) {
    await this.patch(`/business-user/${id}`, { state: 'ACTIVATED' });
  }

  public static async disable(id: number) {
    await this.patch(`/business-user/${id}`, { state: 'DISABLED' });
  }

  public static async delete(id: number) {
    await this.remove(`/business-user/${id}`);
  }

  public static async resetPassword(id: number) {
    return this.post<IBusinessUser>(`/business-user/${id}/reset-password`);
  }
}
