import { CUSTOMER } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(CUSTOMER)
validate({ id: number })
get('/business/:id/sales-reports')
export const getBusinessSalesReports = route(async req => {
  return SalesReport.createQueryBuilder('salesReport')
    .leftJoin(Business, 'business', 'business.userId = salesReport.userId')
    .leftJoin('business.customer', 'customer')
    .where('business.id = :businessId', { businessId: req.params.id })
    .andWhere('customer.id = :customerId', { customerId: req.customer.id })
    .orderBy('salesReport.date', 'DESC')
    .getMany();
});
