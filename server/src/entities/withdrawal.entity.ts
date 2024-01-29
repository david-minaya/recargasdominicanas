import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Balance } from './balance.entity';
import { BankAccount } from './bankAccount.entity';

@Entity()
export class Withdrawal extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  description!: string;

  @OneToOne(() => Balance, balance => balance.deposit, { cascade: true, eager: true })
  @JoinColumn()
  balance!: Balance;

  @ManyToOne(() => BankAccount, bankAccount => bankAccount.deposits, { eager: true })
  bankAccount?: BankAccount;
}
