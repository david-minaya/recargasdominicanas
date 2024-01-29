import { FINANCES } from '../../constants/permissions';
import { Provider } from '../../entities/provider.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { SalesByDay } from '../../interfaces/salesByDay';
import { permission } from '../../middlewares';
import { query } from '../../middlewares/query';
import { getTimezone } from '../../utils/getTimezone';
import { get, route } from '../../utils/routeBuilder';
import { salesByDay } from '../../utils/salesByDay';
import { ServerError } from '../../utils/serverError';
import { date } from '../../utils/validators';

interface Req extends BaseRequest {
  query: {
    startDate: string;
    endDate: string;
  }
}

permission(FINANCES)
query({ startDate: date, endDate: date })
get('/sales-by-day')
export const getSalesByday = route(async (req: Req) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const yearInMilliseconds = 1000 * 60 * 60 * 24 * 365;
  const timezone = getTimezone();

  if (startDate.getTime() > endDate.getTime()) {
    throw new ServerError(409, 'The startDate can\'t be greater than the endDate.');
  }

  if (endDate.getTime() - startDate.getTime() > yearInMilliseconds * 3) {
    throw new ServerError(409, 'The range between the startDate and endDate can\'t be greater than 3 years.');
  }

  const sales = await Provider.createQueryBuilder('provider')
    .select(`DATE(CONVERT_TZ(transaction.date, "${timezone}", "-04:00"))`, 'date')
    .addSelect('SUM(transaction.amount)', 'sales')
    .addSelect('SUM(profit.amount)', 'profit')
    .leftJoin('provider.transactions', 'transaction')
    .leftJoin('transaction.profits', 'profit', 'profit.userId = provider.userId')
    .where('transaction.date >= :startDate AND transaction.date < :endDate')
    .andWhere('transaction.cancelled = false')
    .groupBy(`DATE(CONVERT_TZ(transaction.date, "${timezone}", "-04:00"))`)
    .orderBy(`DATE(CONVERT_TZ(transaction.date, "${timezone}", "-04:00"))`)
    .setParameters({ startDate, endDate })
    .getRawMany<SalesByDay>();

  return salesByDay(startDate, endDate, sales)
});
