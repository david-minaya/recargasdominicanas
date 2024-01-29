import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from 'typeorm';
import { ProductType } from '../constants/productType';
import { ProviderProduct } from './providerProduct.entity';
import { Transaction } from './transaction.entity';
import { Price } from './price.entity';
import { Pin } from './pin.entity';

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('enum', { enum: ProductType })
  type!: ProductType;

  @Column()
  image!: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  profit!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  min!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  max!: number;

  @Column({ default: true })
  enabled!: boolean;

  @OneToMany(() => Transaction, transaction => transaction.product)
  transactions?: Transaction[];

  @OneToMany(() => ProviderProduct, providerProduct => providerProduct.product)
  providerProducts?: ProviderProduct[];

  @OneToOne(() => Pin, pin => pin.product, { cascade: true, eager: true })
  pin!: Pin;

  @OneToMany(() => Price, price => price.product, { cascade: ['insert', 'update'], eager: true })
  prices!: Price[];
}
