import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deposit } from './deposit.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity()
export class Balance extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => User, user => user.balances)
  user?: User;

  @ManyToOne(() => Transaction, transaction => transaction.balance, { nullable: true })
  transaction?: Transaction;

  @OneToOne(() => Deposit, deposit => deposit.balance)
  deposit?: Deposit;
}
