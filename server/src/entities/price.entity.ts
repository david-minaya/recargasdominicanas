import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Pin } from './pin.entity';

@Entity()
export class Price extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price!: number;

  @ManyToOne(() => Pin, pin => pin.prices)
  pin!: Pin;

  @ManyToOne(() => Product, product => product.prices)
  product!: Product;
}
