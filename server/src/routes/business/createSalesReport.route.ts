import { BUSINESS_CREATE_SALES_REPORT } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { BusinessSalesReport } from '../../entities/businessSalesReport.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { calcBusinessProfit } from '../../subqueries/calcBusinessProfit';
import { calcBusinessBalance } from '../../subqueries/calcBusinessBalance';
import { calcBusinessSales } from '../../subqueries/calcBusinessSales';
import { selectLastSalesReport } from '../../subqueries/selectLastSalesReport';

permission(BUSINESS_CREATE_SALES_REPORT)
post('/sales-report')
export const createSalesReport = route(async req => {

  const business = await Business.createQueryBuilder('business')
    .select('business.*')
    .addSelect(calcBusinessBalance, 'balance')
    .addSelect(calcBusinessSales, 'sales')
    .addSelect(calcBusinessProfit, 'profit')
    .leftJoin(selectLastSalesReport, 'lastSalesReport', 'lastSalesReport.userId = business.userId')
    .leftJoin(SalesReport, 'salesReport', 'salesReport.id = lastSalesReport.latestId')
    .where('business.id = :id', { id: req.business.id })
    .getRawOne();

  return BusinessSalesReport.create({
    business: req.business,
    businessUser: req.businessUser,
    salesReport: {
      date: new Date(),
      balance: business.balance,
      sales: business.sales,
      profit: business.profit,
      user: { id: business.userId }
    }
  }).save();
});
