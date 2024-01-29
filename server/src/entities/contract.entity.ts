import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Contract extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nic!: string;

  @Column()
  name!: string;

  @OneToMany(() => Transaction, transaction => transaction.contract)
  transactions!: Transaction[];
}
