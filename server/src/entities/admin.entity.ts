import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deposit } from './deposit.entity';
import { User } from './user.entity';

@Entity()
export class Admin extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, select: false })
  password!: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;

  @OneToMany(() => Deposit, deposit => deposit.assignedBy)
  deposits?: Deposit[];
}
