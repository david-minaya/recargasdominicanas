import { IProduct } from './product.type';
import { IProvider } from './provider.type';

export interface IProviderProduct {
  id: number;
  key: string;
  profit: number;
  enabled: boolean;
  provider: IProvider;
  product: IProduct;
}
