import { IBusiness } from './business.type';
import { IAdmin } from './admin.type';

export interface IBalance {
  id: number;
  amount: number;
  date: string;
  business?: IBusiness;
  admin?: IAdmin;
}
