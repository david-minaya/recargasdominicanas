import { IBank } from './bank.type';
import { IDeposit } from './deposit.type';

export interface IBankAccount {
  id: number;
  name: string;
  accountNumber: string;
  bank: IBank;
  balance: number;
  deposits: IDeposit[];
}

export interface IRegisterDeposit {
  date: Date;
  balance: number;
  reference?: string;
  businessId?: number;
}

export interface IRegisterWithdrawal {
  date: Date;
  balance: number;
  description?: string;
}

export interface IRegisterTransfer {
  destinationBankAccountId: number;
  balance: number;
  date: Date;
  description?: string;
  taxes?: number;
  brcd?: number;
}

export interface IRegisterBalancePurchase {
  providerId: number;
  bankAccountId: number;
  balance: number;
  date: Date;
  description?: string;
  taxes?: number;
  brcd?: number;
}
