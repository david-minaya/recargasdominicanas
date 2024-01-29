import { PROVIDER_READ } from '../../constants/permissions';
import { Transaction } from '../../entities/transaction.entity';
import { permission, validate } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { page } from '../../utils/page';
import { get, route } from '../../utils/routeBuilder';
import { string } from '../../utils/validators';

pagination()
permission(PROVIDER_READ)
validate({ id: string })
get('/:id/transactions')
export const getTransactions = route(async req => {

  const [data, count] = await Transaction.findAndCount({ 
    where: { provider: { id: req.params.id } },
    relations: ['product', 'business', 'contract'],
    order: { date: 'DESC' },
    skip: req.page.skip,
    take: req.page.size
  });

  return page(req.page, count, data);
});
