import { Business } from '../../entities/business.entity';
import { BUSINESS_READ } from '../../constants/permissions';
import { SalesReport } from '../../entities/salesReport.entity';
import { number } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { calcBusinessProfit } from '../../subqueries/calcBusinessProfit';
import { calcBusinessBalance } from '../../subqueries/calcBusinessBalance';
import { calcBusinessSales } from '../../subqueries/calcBusinessSales';
import { selectLastSalesReport } from '../../subqueries/selectLastSalesReport';

permission(BUSINESS_READ)
validate({ id: number })
get('/:id')
export const getBusinessById = route(async req => {

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
    .where('business.id = :id', { id: req.params.id })
    .getRawAndEntities();

  return {
    balance: rawAndEntities.raw[0].balance,
    sales: rawAndEntities.raw[0].sales,
    profit: rawAndEntities.raw[0].profit,
    ...rawAndEntities.entities[0]
  }
});
