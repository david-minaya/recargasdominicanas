import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermission } from './rolePermission.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {

  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, user => user.role)
  users?: User[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role, { cascade: true })
  permissions?: RolePermission[];
}
