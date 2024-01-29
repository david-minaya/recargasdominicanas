import { Pin } from './pin.type';
import { Price } from './price.type';

export interface IProduct {
  id: number;
  type: 'Recarga' | 'Paquetico' | 'Pin' | 'Factura';
  image: string;
  name: string;
  profit: number;
  min: number;
  max: number;
  enabled: boolean;
  pin?: Pin;
  prices: Price[];
}
