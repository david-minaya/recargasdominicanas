import { IUser } from './user.type';
import { IBusiness } from './business.type';

export interface ICustomer {
  id: number;
  docNumber: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  user: IUser;
  business: IBusiness;
  tempPassword: boolean;
}
