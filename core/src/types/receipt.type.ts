import { IDetail } from './detail.type';

export interface IReceipt {
  title: string;
  image: string;
  details: IDetail[];
}
