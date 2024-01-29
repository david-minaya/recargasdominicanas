import { IUser } from './user.type';

export interface IAccessToken {
  id: number;
  token: string;
  expirationDate: string;
  user: IUser;
}
