import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from './provider.entity';

@Entity()
export class ProviderConfig extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  value!: string;

  @ManyToOne(() => Provider, provider => provider.configs)
  provider!: Provider;
}
