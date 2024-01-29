import { Business } from '../../entities/business.entity';
import { BUSINESS_READ_CURRENT_SALES_REPORT } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { Balance } from '../../entities/balance.entity';
import { Profit } from '../../entities/profit.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { businessId } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

permission(BUSINESS_READ_CURRENT_SALES_REPORT)
validate({ id: businessId })
get('/:id/current-sales-report')
export const getCurrentSalesReport = route(async ({ params }) => {

  const businessId = parseInt(params.id);
  const business = await getBusiness(businessId);
  const salesReport = await getLastSalesReports(business.user!.id);
  const balance = await getBalance(business.user!.id, salesReport);
  const sales = await getSales(businessId, salesReport);
  const profit = await getProfit(business.user!.id, salesReport);

  return {
    date: new Date(),
    balance,
    sales,
    profit
  }
});

function getBusiness(id: number) {
  return Business.createQueryBuilder('business')
    .leftJoinAndSelect('business.user', 'user')
    .where('business.id = :id', { id })
    .getOneOrFail();
}

function getLastSalesReports(businessUserId: number) {
  return SalesReport.createQueryBuilder('salesReport')
    .where('salesReport.userId = :id', { id: businessUserId })
    .orderBy('salesReport.id', 'DESC')
    .getOne();
}

async function getBalance(businessUserId: number, salesReport?: SalesReport) {
  
  const result = await Balance.createQueryBuilder('balance')
    .select('IFNULL(SUM(balance.amount), 0) + IFNULL(:balance, 0)', 'balance')
    .leftJoin('balance.transaction', 'transaction')
    .where('balance.userId = :businessUserId')
    .andWhere('balance.date > IFNULL(:date, 0)')
    .andWhere('IF(transaction.cancelled IS NOT NULL, transaction.cancelled = false, true)')
    .setParameters({
      businessUserId,
      balance: salesReport?.balance,
      date: salesReport?.date
    })
    .getRawOne<{ balance: number }>();

  return result?.balance || 0;
}

async function getSales(businessId: number, salesReport?: SalesReport) {

  const result = await Transaction.createQueryBuilder('transaction')
    .select('IFNULL(SUM(transaction.amount), 0)', 'sales')
    .where('transaction.businessId = :businessId')
    .andWhere('transaction.cancelled = false')
    .andWhere('transaction.date > IFNULL(:date, 0)')
    .setParameters({ businessId, date: salesReport?.date })
    .getRawOne<{ sales: number }>();

  return result?.sales || 0;
}

async function getProfit(businessUserId: number, salesReport?: SalesReport) {
  
  const result = await Profit.createQueryBuilder('profit')
    .select('IFNULL(SUM(profit.amount), 0)', 'profit')
    .leftJoin('profit.transaction', 'transaction')
    .where('profit.userId = :businessUserId')
    .andWhere('profit.date > IFNULL(:date, 0)')
    .andWhere('transaction.cancelled = false')
    .setParameters({ businessUserId, date: salesReport?.date })
    .getRawOne<{ profit: number }>();

  return result?.profit || 0;
}
