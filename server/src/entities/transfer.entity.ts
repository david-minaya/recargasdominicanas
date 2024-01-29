import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deposit } from './deposit.entity';
import { Withdrawal } from './withdrawal.entity';
import { ProfitWithdrawal } from './profitWithdrawal.entity';

@Entity()
export class Transfer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Deposit, { cascade: true, eager: true })
  @JoinColumn()
  deposit!: Deposit;

  @OneToOne(() => Withdrawal, { cascade: true, eager: true })
  @JoinColumn()
  withdrawal!: Withdrawal;

  @OneToOne(() => ProfitWithdrawal, { cascade: true })
  @JoinColumn()
  taxes?: ProfitWithdrawal;

  @OneToOne(() => ProfitWithdrawal, { cascade: true })
  @JoinColumn()
  brcd?: ProfitWithdrawal;
}
