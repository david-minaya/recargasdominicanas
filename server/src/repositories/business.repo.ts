import { Business } from '../entities/business.entity';
import { SalesReport } from '../entities/salesReport.entity';
import { calcBusinessBalance } from '../subqueries/calcBusinessBalance';
import { selectLastSalesReport } from '../subqueries/selectLastSalesReport';

export class BusinessRepo {

  static async getBalance(id: number) {

    const business = await Business.createQueryBuilder('business')
      .select(calcBusinessBalance, 'balance')
      .leftJoin(selectLastSalesReport, 'lastSalesReport', 'lastSalesReport.userId = business.userId')
      .leftJoin(SalesReport, 'salesReport', 'salesReport.id = lastSalesReport.latestId')
      .where('business.id = :id', { id })
      .getRawOne<{ balance: number }>();
  
    return business?.balance || 0;
  }
}
