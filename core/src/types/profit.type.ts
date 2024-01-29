import { ITransaction } from './transaction.type';
import { IUser } from './user.type';

export interface IProfit {
  id: number;
  date: Date;
  amount: number;
  transaction: ITransaction;
  user: IUser;
}
