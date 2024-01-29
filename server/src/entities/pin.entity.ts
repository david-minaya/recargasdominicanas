import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Price } from './price.entity';

@Entity()
export class Pin extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  instructions!: string;

  @OneToOne(() => Product, product => product.pin)
  @JoinColumn()
  product!: Product;

  @OneToMany(() => Price, price => price.pin, { cascade: ['update'], eager: true })
  prices!: Price[];
}
