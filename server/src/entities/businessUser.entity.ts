import { ACTIVATED, NOT_ACTIVATED, DISABLED } from '../constants/business-user-state';
import { BusinessSalesReport } from './businessSalesReport.entity';
import { Transaction } from './transaction.entity';
import { Business } from './business.entity';
import { User } from './user.entity';

import { 
  BaseEntity, 
  Column, 
  DeleteDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class BusinessUser extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  userName!: string;

  @Column({ type: 'varchar', unique: true, nullable: true, select: false })
  password?: string | null;

  @Column({
    type: 'enum',
    enum: [ACTIVATED, NOT_ACTIVATED, DISABLED], 
    default: NOT_ACTIVATED 
  })
  state!: typeof ACTIVATED | typeof NOT_ACTIVATED | typeof DISABLED;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Business, business => business.businessUsers)
  business!: Business;

  @OneToMany(() => Transaction, transaction => transaction.business)
  transactions?: Transaction[];

  @OneToMany(() => BusinessSalesReport, businessSalesReport => businessSalesReport.businessUser)
  businessSalesReports?: BusinessSalesReport[];
}
