import { SelectQueryBuilder } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

export function calcBusinessSales(subquery: SelectQueryBuilder<any>) {
  return subquery
    .addSelect('IFNULL(SUM(transaction.amount), 0)')
    .from(Transaction, 'transaction')
    .where('transaction.businessId = business.id')
    .andWhere('transaction.cancelled = false')
    .andWhere('transaction.date > IFNULL(salesReport.date, 0)');
}
