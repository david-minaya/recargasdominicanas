import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ProviderConfig } from './providerConfig.entity';
import { ProviderProduct } from './providerProduct.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Entity()
export class Provider extends BaseEntity {

  @PrimaryColumn()
  id!: number;

  @Column({ nullable: true })
  rnc!: string;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ default: true })
  enabled!: boolean;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user!: User;

  @OneToMany(() => ProviderProduct, providerProduct => providerProduct.provider)
  providerProducts?: ProviderProduct[];

  @OneToMany(() => Transaction, transaction => transaction.provider)
  transactions?: Transaction[];

  @OneToMany(() => ProviderConfig, config => config.provider)
  configs!: ProviderConfig[];
}
