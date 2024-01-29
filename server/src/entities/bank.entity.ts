import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccount } from './bankAccount.entity';

@Entity()
export class Bank extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @OneToMany(() => BankAccount, bankAccount => bankAccount.bank)
  bankAccounts?: BankAccount[];
}
