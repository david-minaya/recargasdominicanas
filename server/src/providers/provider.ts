import axios, { AxiosInstance } from 'axios';
import * as util from 'util';
import { Provider as ProviderEntity } from '../entities/provider.entity';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { DataPlan } from '../interfaces/dataPlan';
import { Invoice } from '../interfaces/invoice';
import { ServerError } from '../utils/serverError';

export abstract class Provider {

  public id: number;
  public provider!: ProviderEntity;
  public user!: User;
  protected api!: AxiosInstance;

  constructor(id: number) {
    this.id = id;
  }

  protected async init() {
    this.provider = await this.getProvider();
    this.user = this.provider.user;
    this.api = axios.create({ baseURL: this.getConfig('api'), timeout: 100000 });
  }

  private async getProvider() {
    return ProviderEntity.createQueryBuilder('provider')
      .leftJoinAndSelect('provider.user', 'user')
      .leftJoinAndSelect('provider.configs', 'config')
      .where('provider.id = :id')
      .setParameters({ id: this.id })
      .getOneOrFail();
  }

  protected getConfig(name: string) {
    const config = this.provider.configs.find(config => config.name === name);
    return config!.value;
  }

  protected error(code: number, name: string, status: string, error?: any) {
    return new ServerError(code, status, {
      message: `${code} -> ${this.provider.name} -> ${name} -> ${status}`,
      error: util.inspect(error)
    });
  }

  protected capitalize(name: string) {
    return name
      .trim()
      .split(' ')
      .filter(word => word !== '')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  public abstract getBalance(): Promise<number>

  public abstract sendTransaction(key: string, phone: string, amount: number, ref: string): Promise<void>;

  public abstract cancelTransaction(key: string, transaction: Transaction): Promise<void>;
  
  public abstract getDataPlans(key: string, phone: string): Promise<DataPlan[]>;

  public abstract sendDataPlan(key: string, phone: string, dataPlan: DataPlan, ref?: string): Promise<void>;

  public abstract sendPin(key: string, amount: number): Promise<string>;

  public abstract getInvoice(key: string, nic: string): Promise<Invoice>;

  public abstract payInvoice(key: string, nic: string, amount: number, ref: string): Promise<void>;

  public abstract cancelInvoice(key: string, nic: string, ref: string): Promise<void>;
}
