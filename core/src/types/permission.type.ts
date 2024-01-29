import { IUserPermission } from './userPermission.type';

export interface IPermission {
  id: string;
  description: string;
  userPermissions: IUserPermission[];
}
