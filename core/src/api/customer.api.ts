import { ICustomer } from '../types';
import { Api } from './api';

export class CustomerApi extends Api {

  public static async createCustomer(customer: any, business: any) {
    return this.post('/customer', { customer, business });
  }

  public static async update(id: number, customer: Partial<ICustomer>) {
    await this.patch(`/customer/${id}`, customer);
  }

  public static async resetPassword(id: number) {
    await this.post(`/customer/${id}/temp-password`);
  }
}
