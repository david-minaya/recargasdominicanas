import { IUser } from './user.type';
import { IProviderProduct } from './providerProduct.type';
import { ITransaction } from './transaction.type';
import { IDeposit } from './deposit.type';
import { IBankAccount } from './bankAccount.type';
import { ISalesReport } from './salesReport.type';
import { IProviderConfig } from './providerConfig.type';

export interface IProvider {
  id: number;
  rnc: string;
  name: string;
  image: string;
  phone: string;
  email: string;
  enabled: boolean;
  balance: number;
  sales: number;
  profit: number;
  user: IUser;
  transactions?: ITransaction[];
  providerProducts: IProviderProduct[];
  deposits: IDeposit[];
  bankAccounts: IBankAccount[];
  salesReports: ISalesReport[];
  configs: IProviderConfig[];
}

export interface IProviderRegisterDeposit {
  bankAccountId: number;
  date: Date;
  balance: number;
  reference?: string;
}
