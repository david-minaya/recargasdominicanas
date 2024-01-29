import { Invoice, ITransaction } from '../types';
import { IDataPlan } from '../types/dataPlan.type';
import { Api } from './api';

export class TransactionApi extends Api {
  
  static async getDataPlans(productId: number, phone: string) {
    return this.get<IDataPlan[]>(`/transactions/data-plans/${productId}/${phone}`, { timeout: 15000 });
  }

  static async sendDataPlan(productId: number, phone: string, planId: string) {
    return this.post<ITransaction>(
      '/transactions/send-data-plan', 
      { productId, phone, planId }, 
      { timeout: 15000 }
    );
  }

  static async sendPin(productId: number, price: number) {
    return this.post<ITransaction>('/transactions/send-pin', { productId, price }, { timeout: 15000 });
  }

  static async getInvoice(productId: number, nic: string) {
    return this.get<Invoice>(`/transactions/invoice/${productId}/${nic}`);
  }

  static async payInvoice(productId: number, nic: string, amount: number) {
    return this.post<ITransaction>('/transactions/pay-invoice', {
      productId,
      nic,
      amount
    });
  }

  static async cancelInvoice(id: number) {
    return this.post(`/transactions/cancel-invoice/${id}`);
  }
}
