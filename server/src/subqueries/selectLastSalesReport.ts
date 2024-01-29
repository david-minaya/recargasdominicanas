import { SelectQueryBuilder } from 'typeorm';
import { SalesReport } from '../entities/salesReport.entity';

export function selectLastSalesReport(subquery: SelectQueryBuilder<any>) {
  return subquery
    .addSelect('salesReport.userId')
    .addSelect('MAX(salesReport.id)', 'latestId')
    .from(SalesReport, 'salesReport')
    .groupBy('salesReport.userId')
}