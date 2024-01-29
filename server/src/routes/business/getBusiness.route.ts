import { BUSINESS_READ } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { calcBusinessProfit } from '../../subqueries/calcBusinessProfit';
import { calcBusinessBalance } from '../../subqueries/calcBusinessBalance';
import { calcBusinessSales } from '../../subqueries/calcBusinessSales';
import { selectLastSalesReport } from '../../subqueries/selectLastSalesReport';

permission(BUSINESS_READ);
get('/')
export const getBusiness = route(async () => {

  const rawAndEntities = await Business.createQueryBuilder('business')
    .addSelect(calcBusinessBalance, 'balance')
    .addSelect(calcBusinessSales, 'sales')
    .addSelect(calcBusinessProfit, 'profit')
    .leftJoin(selectLastSalesReport, 'lastSalesReport', 'lastSalesReport.userId = business.userId')
    .leftJoin(SalesReport, 'salesReport', 'salesReport.id = lastSalesReport.latestId')
    .leftJoinAndSelect('business.user', 'user')
    .leftJoinAndSelect('business.customer', 'customer')
    .leftJoinAndSelect('customer.user', 'customerUser')
    .leftJoinAndSelect('customerUser.tempPassword', 'tempPassword')
    .orderBy('business.id', 'DESC')
    .getRawAndEntities();

  return rawAndEntities.raw.map((raw, index) => ({
    balance: raw.balance,
    sales: raw.sales,
    profit: raw.profit,
    ...rawAndEntities.entities[index]
  }));
});
