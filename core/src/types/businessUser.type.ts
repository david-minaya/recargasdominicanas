import { IUser } from './user.type';
import { IBusiness } from './business.type';

export interface IBusinessUser {
  id: number;
  name: string;
  userName: string;
  state: string;
  user: IUser;
  business: IBusiness;
}
