import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Transaction } from '../entities/transaction.entity';
import { ServerError } from '../utils/serverError';
import { MIDAS_RED } from '../constants/providers';
import { DataPlan } from '../interfaces/dataPlan';
import { Provider } from './provider';

import { 
  DUPLICATED,
  INTERNAL_SERVER_ERROR,
  INVALID_PHONE, 
  NOT_FOUND_EXCEPTION, 
  NO_OUTSTANDING_INVOICES,
  OUTSTANDING_BALANCE,
  REQUEST_TIMEOUT, 
  UNAUTHORIZED,
  UNKNOWN_ERROR
} from '../constants/error-types';

export class Midasred extends Provider {

  private static instance?: Midasred;

  private constructor() {
    super(MIDAS_RED)
  }

  static async createInstance() {

    if (!this.instance) {
      this.instance = new Midasred();
    }
    
    await this.instance.init();

    return this.instance;
  }

  protected async init() {
    await super.init();
    await this.auth();
  }

  private async auth() {

    try {

      const username = this.getConfig('user');
      const password = this.getConfig('pass');
      
      const response = await this.api.post('/auth/login', {
        user: username,
        password: password
      });
  
      if (response.data.cod === '00') {
        this.api.defaults.headers.token = response.data.token;
        return;
      }

      throw new Error();

    } catch (err) {
            
      throw this.error(403, 'auth', UNAUTHORIZED, err);
    }
  }

  async getBalance() {
    const response = await this.api.get('/users/finance/balance')
    return response.data.balance;
  }

  async getDataPlans(key: string, phone: string) {

    try {

      const response = await this.post('/data/get_plans', {
        provider: key,
        subscription_number: phone,
        subscription_type: 'phonenumber'
      }, { timeout: 15000 });
  
      if (response.data.cod !== '00' || response.data.plans.length === 0) {
        throw this.error(404, 'get-data-plans', NOT_FOUND_EXCEPTION, response);
      }
  
      return response.data.plans?.map((plan: any) => {
        const name = plan.nombre.trim();
        return {
          id: `${plan.id}`,
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          price: parseInt(plan.precio)
        }
      });

    } catch (err: any) {
            
      if (err.code === 'ECONNABORTED') {
        throw this.error(408, 'get-data-plans', REQUEST_TIMEOUT, err);
      }

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'get-data-plans', INTERNAL_SERVER_ERROR, err);
    }
  }

  async sendTransaction(key: string, phone: string, amount: number, ref: string) {

    try {

      const response = await this.post('/topup', {
        api_key: key,
        number: phone,
        amount: amount,
        xid: ref,
      });
  
      if (response.data.cod === '12') throw this.error(400, 'send-transaction', INVALID_PHONE, response);
      if (response.data.cod === '16') throw this.error(400, 'send-transaction', DUPLICATED, response);
      if (response.data.cod !== '00') throw this.error(500, 'send-transaction', UNKNOWN_ERROR, response);
  
      return response.data;

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'send-transaction', INTERNAL_SERVER_ERROR, err);
    }
  }

  public async sendDataPlan(key: string, phone: string, dataPlan: DataPlan) {

    try {

      const response = await this.post('/data', {
        provider: key,
        plan_id: dataPlan.id,
        subscription_number: phone
      });

      if (response.data.cod !== '00' && response.data.msg.includes('18')) {
        throw this.error(500, 'send-data-plan', OUTSTANDING_BALANCE, response);
      }
  
      if (response.data.cod !== '00') {
        throw this.error(500, 'send-data-plan', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'send-data-plan', INTERNAL_SERVER_ERROR, err);
    }
  }

  async cancelTransaction(key: string, transaction: Transaction) {

    try {

      const response = await this.post('/topup/reverse', {
        provider: key,
        xid: transaction.reference
      });
  
      if (response.data.cod !== '00') {
        throw this.error(500, 'cancel-transaction', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'cancel-transaction', INTERNAL_SERVER_ERROR, err);
    }
  }

  public sendPin(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  public async getInvoice(key: string, nic: string) {

    try {

      const response = await this.post('/service/get_invoices', {
        provider: key,
        nic: nic
      });

      if (response.data.cod !== '00') {
        throw this.error(404, 'get-invoice', NOT_FOUND_EXCEPTION, response);
      }

      const { customer, total_to_pay } = response.data;
      const firstName = this.parseInvoiceName(customer.first_name);
      const lastName = this.parseInvoiceName(customer.last_name);

      if (total_to_pay <= 0) {
        throw this.error(400, 'get-invoice', NO_OUTSTANDING_INVOICES, response);
      }

      return {
        nic: nic,
        name: `${firstName} ${lastName}`.trim(),
        amount: total_to_pay
      }

    } catch (err: any) {

      if (err.code === 'ECONNABORTED') {
        throw this.error(408, 'get-invoice', REQUEST_TIMEOUT, err);
      }

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'get-invoice', INTERNAL_SERVER_ERROR, err);
    }
  }

  public async payInvoice(key: string, nic: string, amount: number, ref: string) {

    try {

      const response = await this.post('/service', {
        provider: key,
        nic: nic,
        amount: amount,
        xid: ref,
      });
  
      if (response.data.cod !== '00') {
        throw this.error(400, 'pay-invoice', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'pay-invoice', INTERNAL_SERVER_ERROR, err);
    }
  }

  public async cancelInvoice(key: string, nic: string, ref: string) {
    
    try {

      const response = await this.post('/service/reverse', {
        provider: key,
        nic,
        xid: ref
      });
  
      if (response.data.cod !== '00') {
        throw this.error(500, 'cancel-invoice', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'cancel-invoice', INTERNAL_SERVER_ERROR, err);
    }
  }

  private async post<T = any>(url: string, data: any, config?: AxiosRequestConfig) {
    return this.checkAuth<T>(() => this.api.post(url, data, config));
  }

  /**
   * If the request fails with the Unauthorized error, this method tries 
   * to authenticate again, and if is successful, sends the request again.
   */ 
  private async checkAuth<T>(request: () => Promise<AxiosResponse<any>>): Promise<AxiosResponse<T>> {

    try {

      const response = await request();
      
      if (response.data.cod === '14' || response.data.cod === '99') {
        throw new Error(UNAUTHORIZED);
      }
  
      return response;

    } catch (err: any) {
      
      if (err.message === UNAUTHORIZED || err.response?.data?.cod === '99') {

        await this.auth();
          
        const response = await request();

        if (response.data.cod === '14' || response.data.cod === '99') {
          throw this.error(403, 'check-auth', UNAUTHORIZED, response);
        }

        return response;
      }

      throw err;
    }
  }

  private parseInvoiceName(name: string) {
    return name.toLowerCase().trim() !== 'n/a' ? this.capitalize(name) : '';
  }
}
