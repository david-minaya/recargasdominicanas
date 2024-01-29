import { BUSINESS_READ_SALES_REPORTS } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(BUSINESS_READ_SALES_REPORTS)
validate({ id: number })
get('/:id/sales-reports')
export const getSalesReports = route(async req => {
  return SalesReport.createQueryBuilder('salesReport')
    .leftJoin(Business, 'business', 'business.userId = salesReport.userId')
    .orderBy('salesReport.date', 'DESC')
    .where('business.id = :id', { id: req.params.id })
    .getMany();
});
