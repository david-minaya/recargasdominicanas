import { IBusinessUser } from './businessUser.type';
import { ICustomer } from './customer.type';
import { IDeposit } from './deposit.type';
import { ISalesReport } from './salesReport.type';
import { ISalesSummary } from './salesSummary.type';
import { ITransaction } from './transaction.type';

export interface IBusiness {  
  id: number;
  rnc: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  balance: number;
  sales: number;
  profit: number;
  percent: number;
  system: any;
  user: any;
  customer: ICustomer;
  salesSummary: ISalesSummary;
  businessUsers: IBusinessUser[];
  transactions: ITransaction[];
  deposits: IDeposit[];
  salesReports: ISalesReport[];
  balances: any[];
}
