import { IProfit } from './profit.type';
import { IAccessToken } from './accessToken.type';
import { IUserPermission } from './userPermission.type';

export interface IUser {
  id: number;
  profits: IProfit[];
  userPermissions?: IUserPermission[];
  accessToken: IAccessToken;
  tempPassword?: {
    id: number;
    password: string;
    expirationDate: string;
  }
}
