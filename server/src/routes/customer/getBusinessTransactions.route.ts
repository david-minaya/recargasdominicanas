import { CUSTOMER } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { permission, validate } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { page } from '../../utils/page';
import { get, route } from '../../utils/routeBuilder';
import { date2, number, optional } from '../../utils/validators';

pagination()
permission(CUSTOMER)
validate({ id: number, startDate: [date2, optional], endDate: [date2, optional] })
get('/business/:id/transactions')
export const getBusinessTransactions = route(async req => {

  const [data, count] = await Transaction.createQueryBuilder('transaction')
    .select([
      'transaction.id',
      'transaction.phone',
      'transaction.amount',
      'transaction.date',
      'transaction.reference',
      'transaction.cancelled',
      'product.name',
      'product.type',
      'product.image',
      'profit.amount',
      'contract.nic'
    ])
    .leftJoin('transaction.business', 'business')
    .leftJoin('transaction.product', 'product')
    .leftJoin('transaction.contract', 'contract')
    .leftJoin('transaction.profits', 'profit')
    .leftJoin('business.customer', 'customer')
    .where('customer.id = :customerId')
    .andWhere('business.id = :businessId')
    .andWhere('DATE(transaction.date) BETWEEN :startDate AND :endDate')
    .andWhere('profit.userId = business.userId')
    .orderBy('transaction.date', 'DESC')
    .skip(req.page.skip)
    .take(req.page.size)
    .setParameters({
      customerId: req.customer.id,
      businessId: req.params.id,
      startDate: req.query.startDate || '2020-01-01',
      endDate: req.query.endDate || '3020-01-01'
    })
    .getManyAndCount();

  const transactions = data.map(transaction => ({
    ...transaction,
    profit: transaction.profits[0].amount,
    profits: undefined
  }));

  return page(req.page, count, transactions);
});
