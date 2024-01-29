import { BUSINESS_READ_TRANSACTIONS } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { permission, validate } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { page } from '../../utils/page';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

pagination()
permission(BUSINESS_READ_TRANSACTIONS)
validate({ id: number })
get('/:id/transactions')
export const getTransactions = route(async req => {
  
  const [data, count] = await Transaction.findAndCount({ 
    where: { business: { id: req.params.id } },
    relations: ['product', 'contract'],
    order: { date: 'DESC' },
    skip: req.page.skip,
    take: req.page.size
  });

  return page(req.page, count, data);
});
