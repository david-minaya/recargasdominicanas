import { Price } from './price.type';

export interface Pin {
  id: number;
  instructions?: string;
  prices: Price[];
}
