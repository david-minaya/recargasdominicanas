import { SelectQueryBuilder } from 'typeorm';
import { Balance } from '../entities/balance.entity';

export function calcBusinessBalance(subquery: SelectQueryBuilder<any>) {
  return subquery
    .addSelect('IFNULL(SUM(balance.amount), 0) + IFNULL(salesReport.balance, 0)')
    .from(Balance, 'balance')
    .leftJoin('balance.transaction', 'transaction')
    .where('balance.userId = business.userId')
    .andWhere('balance.date > IFNULL(salesReport.date, 0)')
    .andWhere('IF(transaction.cancelled IS NOT NULL, transaction.cancelled = false, true)');
}
