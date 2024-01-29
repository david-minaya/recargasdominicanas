import { IBalance } from './balance.type';
import { IBankAccount } from './bankAccount.type';

export interface IWithdrawal {
  id: number;
  date: Date;
  description: string;
  balance: IBalance;
  bankAccount: IBankAccount;
}
