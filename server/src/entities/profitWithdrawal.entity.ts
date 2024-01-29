import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Withdrawal } from './withdrawal.entity';

@Entity()
export class ProfitWithdrawal extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Withdrawal, { cascade: true, eager: true })
  @JoinColumn()
  withdrawal!: Withdrawal;
}
