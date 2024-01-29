import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Business } from './business.entity';
import { BusinessUser } from './businessUser.entity';
import { SalesReport } from './salesReport.entity';

@Entity()
export class BusinessSalesReport extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Business, business => business.businessSalesReports, { eager: true })
  business!: Business;

  @ManyToOne(() => BusinessUser, businessUser => businessUser.businessSalesReports, { eager: true })
  businessUser!: BusinessUser;

  @OneToOne(() => SalesReport, { cascade: true, eager: true })
  @JoinColumn()
  salesReport!: SalesReport;
}
