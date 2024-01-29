import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SalesReport extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  sales!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  profit!: number;

  @ManyToOne(() => User, user => user.salesReports)
  user!: User;
}
