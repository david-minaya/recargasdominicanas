import { Provider } from './provider';
import { ServerError } from '../utils/serverError';
import { TEST_PROVIDER } from '../constants/providers';
import { Invoice } from '../interfaces/invoice';

import { 
  DUPLICATED, 
  INVALID_PHONE, 
  NOT_FOUND_EXCEPTION, 
  NO_OUTSTANDING_INVOICES, 
  OUTSTANDING_BALANCE, 
  UNKNOWN_ERROR, 
  WRONG_COMPANY 
} from '../constants/error-types';

export class TestProvider extends Provider {

  private static instance?: TestProvider;

  static async createInstance() {

    if (!this.instance) {
      this.instance = new TestProvider();
    }
    
    await this.instance.init();
    
    return this.instance;
  }

  private constructor() {
    super(TEST_PROVIDER);
  }

  async getBalance() {
    return 20000
  }

  async sendTransaction(key: string, phone: string) {

    const companies: { [key: string]: string[] } = {
      'claro': ['8096065924', '8091112222', '8091113333', '8091114444'],
      'altice': ['8291112222'],
      'viva': ['8491112222'],
    };

    const company = companies[key];

    if (!company) {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          reject(new ServerError(400, WRONG_COMPANY));
        }, 3000)
      })
    }

    if (!company.includes(phone)) {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          reject(new ServerError(400, INVALID_PHONE));
        }, 3000)
      })
    }
    
    if (phone === '8091113333') {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          reject(new ServerError(400, DUPLICATED));
        }, 3000)
      })
    }

    if (phone === '8091114444') {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          reject(new ServerError(400, UNKNOWN_ERROR));
        }, 3000)
      })
    }
  }

  async cancelTransaction() {
    // not implemented
  }

  public async getDataPlans(key: string, phone: string) {

    if (phone === '8091112222') {
      return new Promise<any>((resolve, rejects) => {
        setTimeout(() => rejects(NOT_FOUND_EXCEPTION), 2000);
      });
    }

    return new Promise<any>((resolve, rejects) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: '1 día 1GB', price: 50 },
          { id: '2', name: '3 día 3GB', price: 100 },
          { id: '3', name: '5 día 5GB', price: 150 }
        ]);
      }, 2000)
    })
  }

  public async sendDataPlan(key: string, phone: string) {

    if (phone === '8091113333') {
      return new Promise<any>((resolve, rejects) => {
        setTimeout(() => {
          rejects(UNKNOWN_ERROR);
        }, 2000)
      });
    }

    if (phone === '8091114444') {
      return new Promise<any>((resolve, rejects) => {
        setTimeout(() => {
          rejects(new ServerError(400, OUTSTANDING_BALANCE));
        }, 2000)
      });
    }
  }

  public sendPin(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Date.now().toString().substring(2, 10));
      }, 2000);
    });
  }

  public getInvoice(key: string, nic: string): Promise<Invoice> {
    
    if (nic === '8096065924') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            nic: '8096065924',
            name: 'David Minaya',
            amount: 500
          })
        }, 2000);
      });
    }

    if (nic === '0000') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            nic: '0000',
            name: 'David Minaya',
            amount: 105.3
          })
        }, 2000);
      });
    }

    if (nic === '1111') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            nic: '1111',
            name: 'David Solano',
            amount: 40000
          })
        }, 2000);
      });
    }

    if (nic === '2222') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            nic: '2222',
            name: 'Miguel Minaya',
            amount: 800
          })
        }, 2000);
      });
    }

    if (nic === '3333') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(this.error(400, 'get-invoice', NO_OUTSTANDING_INVOICES));
        }, 2000);
      })
    }

    throw this.error(404, 'get-invoice', NOT_FOUND_EXCEPTION);
  }

  public async payInvoice(key: string, nic: string, amount: number, ref: string) {

    if (nic === '2222') {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          reject('Error pay invoice');
        }, 3000);
      })
    }

    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    })
  }

  public async cancelInvoice() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
