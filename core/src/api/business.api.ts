import { Api } from './api';

import { 
  IBusiness, 
  IBusinessUser, 
  IDeposit, 
  IPage, 
  IProduct, 
  ISalesReport, 
  ISalesSummary, 
  ITransaction
} from '../types';

export class BusinessApi extends Api {

  public static async createSalesReport() {
    return this.post('/business/sales-report');
  }

  public static async getSalesSummary() {
    return this.get<ISalesSummary>('/business/sales-summary');
  }

  public static async getBusiness() {
    return this.get<IBusiness[]>('/business');
  }

  public static async getProducts() {
    return this.get<IProduct[]>('/business/products');
  }

  public static async getBusinessById(id: number) {
    return this.get<IBusiness>(`/business/${id}`);
  }

  public static async search(text?: string) {
    return this.get<IBusiness[]>(`/business/search?text=${text}`);
  }

  public static async getDeposits(id: number) {
    return this.get<IDeposit[]>(`/business/${id}/deposits`);
  }

  static async getTransactions(id: number, page?: number, size?: number) {
    return this.get<IPage<ITransaction>>(`/business/${id}/transactions`, { params: { page, size } });
  }

  public static async getUsers(id: number) {
    return this.get<IBusinessUser[]>(`/business/${id}/users`);
  }

  public static async getCurrentSalesReport(id: number) {
    return this.get<ISalesReport>(`/business/${id}/current-sales-report`);
  }

  public static async getSalesReports(id: number) {
    return this.get<ISalesReport[]>(`/business/${id}/sales-reports`);
  }

  public static async update(id: number, business: Partial<IBusiness>) {
    await this.patch(`/business/${id}`, business);
  }

  public static async addNotificationToken(token: string) {
    await this.post('/business/notification-token', { token });
  }
}
