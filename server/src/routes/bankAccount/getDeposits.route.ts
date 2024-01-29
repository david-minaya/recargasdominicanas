import { get, route } from '../../utils/routeBuilder';
import { DEPOSIT_READ } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { params } from '../../middlewares/params';
import { number } from '../../utils/validators';
import { page } from '../../utils/page';

permission(DEPOSIT_READ)
pagination()
params({ id: number })
get('/:id/deposits')
export const getDeposits = route(async req => {
  
  const [deposits, count] = await Deposit.createQueryBuilder('deposit')
    .leftJoin('deposit.user', 'user')
    .leftJoin('deposit.bankAccount', 'bankAccount')
    .leftJoinAndMapOne('deposit.business', Business, 'business', 'business.userId = user.id')
    .leftJoinAndSelect('deposit.balance', 'balance')
    .where('bankAccount.id = :id', { id: req.params.id })
    .orderBy('deposit.date', 'DESC')
    .skip(req.page.skip)
    .take(req.page.size)
    .getManyAndCount();

  return page(req.page, count, deposits);
});
