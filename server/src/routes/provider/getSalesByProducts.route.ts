import { PROVIDER_READ } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { SalesByProduct } from '../../interfaces/salesByProduct';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { query } from '../../middlewares/query';
import { get, route } from '../../utils/routeBuilder';
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
get('/:id/sales-by-products')
export const getSalesByProducts = route(async (req: Req) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  return Transaction.createQueryBuilder('transaction')
    .select('product.id', 'id')
    .addSelect('product.name', 'name')
    .addSelect('product.type', 'type')
    .addSelect('SUM(transaction.amount)', 'total')
    .leftJoin('transaction.product', 'product')
    .where('transaction.providerId = :id')
    .andWhere('transaction.cancelled = false')
    .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
    .addGroupBy('product.id')
    .orderBy('total', 'DESC')
    .setParameters({ id: req.params.id, startDate, endDate })
    .getRawMany<SalesByProduct>();
});
