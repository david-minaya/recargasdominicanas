import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Balance } from './balance.entity';
import { BankAccount } from './bankAccount.entity';
import { User } from './user.entity';

@Entity()
export class Deposit extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  reference!: string;

  @Column()
  date!: Date;

  @ManyToOne(() => BankAccount, bankAccount => bankAccount.deposits)
  bankAccount?: BankAccount;

  @ManyToOne(() => User, user => user.deposits)
  user!: User;

  @ManyToOne(() => Admin, admin => admin.deposits)
  assignedBy!: Admin;

  @OneToOne(() => Balance, balance => balance.deposit, { cascade: true })
  @JoinColumn()
  balance!: Balance;
}
