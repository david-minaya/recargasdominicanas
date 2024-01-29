import { IUser } from './user.type';
import { IBalance } from './balance.type';

export interface IAdmin {
  id: number;
  name: string;
  email: string;
  user?: IUser;
  balances?: IBalance[];
}
