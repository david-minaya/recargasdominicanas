import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessSalesReport } from './businessSalesReport.entity';
import { BusinessUser } from './businessUser.entity';
import { Customer } from './customer.entity';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

enum System {
  WEB_APP = 'WEB_APP',
  MOBILE_APP = 'MOBILE_APP'
}

@Entity()
export class Business extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  rnc?: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column()
  city!: string;

  @Column()
  address!: string;

  @Column('enum', { enum: System, nullable: true })
  system!: System;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  percent!: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user?: User;

  @ManyToOne(() => Customer, customer => customer.business)
  customer!: Customer;

  @OneToMany(() => BusinessUser, businessUser => businessUser.business, { cascade: true })
  businessUsers?: BusinessUser[];

  @OneToMany(() => Transaction, transaction => transaction.business)
  transactions?: Transaction[];

  @OneToMany(() => BusinessSalesReport, businessSalesReport => businessSalesReport.business)
  businessSalesReports!: BusinessSalesReport[];
}
