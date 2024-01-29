import { FINANCES } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { SalesByProduct } from '../../interfaces/salesByProduct';
import { permission } from '../../middlewares';
import { query } from '../../middlewares/query';
import { get, route } from '../../utils/routeBuilder';
import { date } from '../../utils/validators';

interface Req extends BaseRequest {
  query: {
    startDate: string;
    endDate: string;
  }
}

permission(FINANCES)
query({ startDate: date, endDate: date })
get('/sales-by-products')
export const getSalesByProducts = route(async (req: Req) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  return Transaction.createQueryBuilder('transaction')
    .select('product.id', 'id')
    .addSelect('product.name', 'name')
    .addSelect('product.type', 'type')
    .addSelect('SUM(transaction.amount)', 'total')
    .leftJoin('transaction.product', 'product')
    .where('transaction.cancelled = false')
    .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
    .addGroupBy('product.id')
    .orderBy('total', 'DESC')
    .setParameters({ startDate, endDate })
    .getRawMany<SalesByProduct>();
});
