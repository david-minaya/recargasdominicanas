import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bank } from './bank.entity';
import { Deposit } from './deposit.entity';
import { User } from './user.entity';

@Entity()
export class BankAccount extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  accountNumber!: string;

  @ManyToOne(() => Bank, bank => bank.bankAccounts, { cascade: true, eager: true })
  bank?: Bank;

  @OneToMany(() => Deposit, deposit => deposit.bankAccount)
  deposits?: Deposit[];

  @ManyToOne(() => User, user => user.bankAccounts, { nullable: true })
  user?: User;
}
