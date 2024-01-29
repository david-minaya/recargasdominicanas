import { IUser } from './user.type';
import { IBusiness } from './business.type';
import { IBalance } from './balance.type';
import { IBankAccount } from './bankAccount.type';

export interface IDeposit {
  id: number;
  balance: IBalance;
  reference?: string;
  date: Date;
  bankAccount: IBankAccount;
  business: IBusiness;
  assignedBy: IUser;
}
