import { ITransaction } from './transaction.type';

export interface ITransactionGroups {
  date: string;
  transactions: ITransaction[];
}
