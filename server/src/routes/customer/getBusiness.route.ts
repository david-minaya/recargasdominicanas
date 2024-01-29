import { CUSTOMER } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { calcBusinessProfit } from '../../subqueries/calcBusinessProfit';
import { calcBusinessBalance } from '../../subqueries/calcBusinessBalance';
import { calcBusinessSales } from '../../subqueries/calcBusinessSales';
import { selectLastSalesReport } from '../../subqueries/selectLastSalesReport';

permission(CUSTOMER);
get('/business')
export const getBusiness = route(async (req) => {

  const rawAndEntities = await Business.createQueryBuilder('business')
    .select([
      'business.id',
      'business.name',
      'business.rnc',
      'business.phone',
      'business.email',
      'business.city',
      'business.address',
      'customer.docNumber',
      'customer.name',
      'customer.phone',
      'customer.email'
    ])
    .addSelect(calcBusinessBalance, 'balance')
    .addSelect(calcBusinessSales, 'sales')
    .addSelect(calcBusinessProfit, 'profit')
    .leftJoin(selectLastSalesReport, 'lastSalesReport', 'lastSalesReport.userId = business.userId')
    .leftJoin(SalesReport, 'salesReport', 'salesReport.id = lastSalesReport.latestId')
    .leftJoin('business.customer', 'customer')
    .where('customer.id = :id', { id: req.customer.id })
    .orderBy('business.id', 'DESC')
    .getRawAndEntities();

  return rawAndEntities.raw.map((raw, index) => ({
    balance: raw.balance,
    sales: raw.sales,
    profit: raw.profit,
    ...rawAndEntities.entities[index]
  }));
});
