import { PROVIDER_READ } from '../../constants/permissions';
import { Provider } from '../../entities/provider.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { SalesByMonth } from '../../interfaces/salesByMonth';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { query } from '../../middlewares/query';
import { getTimezone } from '../../utils/getTimezone';
import { get, route } from '../../utils/routeBuilder';
import { salesByMonth } from '../../utils/salesByMonth';
import { ServerError } from '../../utils/serverError';
import { date, number } from '../../utils/validators';

interface Req extends BaseRequest {
  params: {
    id: number;
  }
  query: {
    startDate: string;
    endDate: string;
  }
}

permission(PROVIDER_READ)
params({ id: number })
query({ startDate: date, endDate: date })
get('/:id/sales-by-month')
export const getSalesByMonth = route(async (req: Req) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const yearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
  const timezone = getTimezone();
  const timezoneDate = `CONVERT_TZ(transaction.date, "${timezone}", "-04:00")`;

  if (startDate.getTime() > endDate.getTime()) {
    throw new ServerError(409, 'The startDate can\'t be greater than the endDate.');
  }

  if (endDate.getTime() - startDate.getTime() > yearInMilliseconds * 5) {
    throw new ServerError(409, 'The range between the startDate and endDate can\'t be greater than 5 years.');
  }

  const sales = await Provider.createQueryBuilder('provider')
    .select(`SUBDATE(DATE(${timezoneDate}), DAY(${timezoneDate})-1)`, 'date')
    .addSelect('SUM(transaction.amount)', 'sales')
    .addSelect('SUM(profit.amount)', 'profit')
    .leftJoin('provider.transactions', 'transaction')
    .leftJoin('transaction.profits', 'profit', 'profit.userId = provider.userId')
    .where('provider.id = :id')
    .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
    .andWhere('transaction.cancelled = false')
    .groupBy(`SUBDATE(DATE(${timezoneDate}), DAY(${timezoneDate})-1)`)
    .orderBy(`SUBDATE(DATE(${timezoneDate}), DAY(${timezoneDate})-1)`)
    .setParameters({ id: req.params.id, startDate, endDate })
    .getRawMany<SalesByMonth>();

  return salesByMonth(startDate, endDate, sales);
});
