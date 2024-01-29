import { SelectQueryBuilder } from 'typeorm';
import { Profit } from '../entities/profit.entity';

export function calcBusinessProfit(subquery: SelectQueryBuilder<any>) { 
  return subquery
    .addSelect('IFNULL(SUM(profit.amount), 0)')
    .from(Profit, 'profit')
    .leftJoin('profit.transaction', 'transaction')
    .where('profit.userId = business.userId')
    .andWhere('transaction.cancelled = false')
    .andWhere('profit.date > IFNULL(salesReport.date, 0)');
}
