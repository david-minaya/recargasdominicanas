import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, role => role.permissions)
  role!: Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  permission?: Permission;
}
