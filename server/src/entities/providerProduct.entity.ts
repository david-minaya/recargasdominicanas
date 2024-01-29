import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Provider } from './provider.entity';

@Entity()
export class ProviderProduct extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  profit!: number;

  @Column({ default: true })
  enabled!: boolean;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @ManyToOne(() => Provider, provider => provider.providerProducts)
  provider!: Provider;

  @ManyToOne(() => Product, product => product.providerProducts, { eager: true })
  product!: Product;
}
