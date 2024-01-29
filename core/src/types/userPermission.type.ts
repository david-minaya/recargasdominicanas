import { IUser } from './user.type';
import { IPermission } from './permission.type';

export interface IUserPermission {
  id: number;
  enable: boolean;
  user: IUser;
  permission: IPermission;
}
