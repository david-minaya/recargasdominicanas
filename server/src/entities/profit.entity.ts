import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity()
export class Profit extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Transaction, transaction => transaction.profits)
  transaction?: Transaction;

  @ManyToOne(() => User, user => user.profits)
  user?: User;
}
