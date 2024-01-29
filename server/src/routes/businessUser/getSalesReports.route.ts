import { BUSINESS_USER_READ } from '../../constants/permissions';
import { BusinessSalesReport } from '../../entities/businessSalesReport.entity';
import { SalesReport } from '../../entities/salesReport.entity';
import { permission } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { get, route } from '../../utils/routeBuilder';
import { page } from '../../utils/page';

permission(BUSINESS_USER_READ)
pagination()
get('/sales-reports')
export const getSalesReports = route(async (req) => {
  
  const [salesReports, count] = await SalesReport.createQueryBuilder('salesReport')
    .leftJoin(BusinessSalesReport, 'businessSalesReport', 'businessSalesReport.salesReportId = salesReport.id')
    .where('businessSalesReport.businessUserId = :id', { id: req.businessUser.id })
    .orderBy('salesReport.date', 'DESC')
    .skip(req.page.skip)
    .take(req.page.size)
    .getManyAndCount();
  
  return page(req.page, count, salesReports);
});
