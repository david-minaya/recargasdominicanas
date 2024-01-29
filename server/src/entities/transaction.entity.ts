import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Balance } from './balance.entity';
import { Business } from './business.entity';
import { BusinessUser } from './businessUser.entity';
import { Contract } from './contract.entity';
import { Product } from './product.entity';
import { Profit } from './profit.entity';
import { Provider } from './provider.entity';

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  phone?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({ nullable: true, select: false })
  pin?: string;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  reference!: string;

  @Column({ default: false })
  cancelled!: boolean;

  @ManyToOne(() => Business, business => business.transactions)
  business!: Business;

  @ManyToOne(() => BusinessUser, businessUser => businessUser.transactions)
  businessUser!: BusinessUser;

  @ManyToOne(() => Provider, provider => provider.transactions)
  provider!: Provider;

  @ManyToOne(() => Product, product => product.transactions)
  product!: Product;

  @OneToMany(() => Profit, profit => profit.transaction, { cascade: ['insert'] })
  profits!: Profit[];

  @OneToMany(() => Balance, balance => balance.transaction, { cascade: true })
  balance?: Balance[];

  @ManyToOne(() => Contract, contract => contract.transactions)
  contract!: Contract;
}
