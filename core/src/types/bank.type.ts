import { IBankAccount } from './bankAccount.type';

export interface IBank {
  id: number;
  name: string;
  image: string;
  balance: number;
  bankAccounts: IBankAccount[];
}
