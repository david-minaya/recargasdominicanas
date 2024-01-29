import { XMLParser } from 'fast-xml-parser';
import { ServerError } from '../utils/serverError';
import { ZATACA } from '../constants/providers';
import { Provider } from './provider';
import { DataPlan } from '../entities/dataPlan.entity';
import { Invoice } from '../interfaces/invoice';
import { Transaction } from '../entities/transaction.entity';

import {
  DUPLICATED,
  INTERNAL_SERVER_ERROR,
  INVALID_PHONE, 
  NOT_FOUND_EXCEPTION, 
  OUTSTANDING_BALANCE, 
  REQUEST_TIMEOUT, 
  UNKNOWN_ERROR
} from '../constants/error-types';

interface Response {
  status: string;
  error: string;
  error_numero: string;
  message: string;
  otp: string;
  version: string;
  actualizarProductos: string;
  ip: string;
  idOperacion: string;
  alertas: string;
  pin: string;
  saldo: string;
}

export class Zataca extends Provider {

  private static instance?: Zataca;

  private constructor() {
    super(ZATACA)
  }

  static async createInstance() {

    if (!this.instance) {
      this.instance = new Zataca();
    }
    
    await this.instance.init();
    
    return this.instance;
  }

  async getBalance() {

    const response = await this.api.get('/service.php', {
      params: {
        web: 1,
        accion: 'SALDO',
        login: this.getConfig('user'),
        pass: this.getConfig('pass')
      }
    })

    const data = this.parseXml(response.data);

    return parseFloat(data.saldo.replace(/,/g, ''));
  }

  async getDataPlans(key: string, phone: string): Promise<DataPlan[]> {

    try {

      const response = await this.api.post('/getPaquetitos.php', undefined, {
        params: {
          login: this.getConfig('user'),
          pass: this.getConfig('pass'),
          operador: key,
          msisdn: phone
        },
        timeout: 15000
      });
  
      if (response.data.cod !== '00' || response.data?.datos?.length === 0) {
        throw this.error(404, 'get-data-plans', NOT_FOUND_EXCEPTION, response);
      }
  
      return response.data?.datos?.map((plan: any) => {
        const name = plan.Descripcion.trim();
        return {
          id: plan.ID_Oferta.toString(),
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          price: parseInt(plan.Precio)
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

      const response = await this.api.post('/service.php', undefined, {
        params: {
          web: 1,
          accion: 'RECARGA',
          login: this.getConfig('user'),
          pass: this.getConfig('pass'),
          operador: key,
          celular: phone,
          monto: amount,
          referencia_local: ref
        }
      });
  
      const data = this.parseXml(response.data);
  
      if (data.error_numero === '11') throw this.error(400, 'send-transaction', INVALID_PHONE);
      if (data.error_numero === '8') throw this.error(400, 'send-transaction', DUPLICATED);
      if (data.error === '1') throw this.error(500, 'send-transaction', UNKNOWN_ERROR, response);

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'send-transaction', INTERNAL_SERVER_ERROR, err);
    }
  }

  async sendDataPlan(key: string, phone: string, dataPlan: DataPlan, ref?: string) {

    try {

      const response = await this.api.post('/service.php', undefined, {
        params: {
          web: 1,
          accion: 'RECARGA',
          login: this.getConfig('user'),
          pass: this.getConfig('pass'),
          operador: key,
          paquetito: dataPlan.id,
          celular: phone,
          monto: dataPlan.price,
          referencia_local: ref
        }
      })
  
      const data = this.parseXml(response.data);
  
      if (data.error === '1' && data.message.includes('PRESTAMO')) {
        throw this.error(500, 'send-data-plan', OUTSTANDING_BALANCE, response);
      }

      if (data.error === '1') {
        throw this.error(500, 'send-data-plan', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'send-data-plan', INTERNAL_SERVER_ERROR, err);
    }
  }

  async sendPin(key: string, amount: number) {

    try {

      const response = await this.api.post('/service.php', undefined, {
        params: {
          web: 1,
          accion: 'RECARGA',
          login: this.getConfig('user'),
          pass: this.getConfig('pass'),
          operador: key,
          monto: amount
        }
      });
  
      const data = this.parseXml(response.data);
  
      if (data.error === '1') {
        throw this.error(500, 'send-pin', UNKNOWN_ERROR, response);
      }
  
      return data.pin;

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'send-pin', INTERNAL_SERVER_ERROR, err);
    }
  }

  async cancelTransaction(key: string, transaction: Transaction) {
    
    try {

      const response = await this.api.post('/service.php', undefined, {
        params: {
          web: 1,
          accion: 'ANULACION',
          login: this.getConfig('user'),
          pass: this.getConfig('pass'),
          operador: key,
          celular: transaction.phone,
          monto: transaction.amount,
          referencia_local: transaction.reference
        }
      });
  
      const data = this.parseXml(response.data);
  
      if (data.error === '1') {
        throw this.error(500, 'cancel-transaction', UNKNOWN_ERROR, response);
      }

    } catch (err: any) {

      if (err instanceof ServerError) {
        throw err;
      }

      throw this.error(500, 'cancel-transaction', INTERNAL_SERVER_ERROR, err);
    }
  }

  public getInvoice(): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }

  public async payInvoice() {
    throw new Error('Method not implemented.');
  }

  public async cancelInvoice() {
    throw new Error('Method not implemented.');
  }

  private parseXml(data: string): Response {

    const parser = new XMLParser({ 
      ignoreAttributes: false,
      attributeNamePrefix: ''
    });

    const result = parser.parse(data);

    return result.doc.param.reduce((map: any, param: any) => {
      return { ...map, [param.name]: param.value }
    }, {});
  }
}
