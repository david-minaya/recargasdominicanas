import { IBusiness } from './business.type';
import { IProvider } from './provider.type';
import { IProduct } from './product.type';
import { IProfit } from './profit.type';
import { IContract } from './contract.type';

export interface ITransaction {
  id: number;
  phone: string;
  pin?: string;
  amount: number;
  profit: number;
  date: string;
  reference?: number;
  cancelled: boolean;
  product: IProduct;
  business?: IBusiness;
  provider?: IProvider;
  profits?: IProfit[];
  contract?: IContract;
}
