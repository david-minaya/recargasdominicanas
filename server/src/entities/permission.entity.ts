import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermission } from './rolePermission.entity';

@Entity()
export class Permission extends BaseEntity {

  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
  rolePermissions!: RolePermission[];
}
