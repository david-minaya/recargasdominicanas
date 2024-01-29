import { get, route } from '../../utils/routeBuilder';
import { DEPOSIT_READ } from '../../constants/permissions';
import { Withdrawal } from '../../entities/withdrawal.entity';
import { permission } from '../../middlewares';
import { pagination } from '../../middlewares/pagination';
import { params } from '../../middlewares/params';
import { number } from '../../utils/validators';
import { page } from '../../utils/page';

permission(DEPOSIT_READ)
pagination()
params({ id: number })
get('/:id/withdrawals')
export const getWithdrawals = route(async req => {
  
  const [withdrawals, count] = await Withdrawal.createQueryBuilder('withdrawal')
    .leftJoin('withdrawal.bankAccount', 'bankAccount')
    .leftJoinAndSelect('withdrawal.balance', 'balance')
    .where('bankAccount.id = :id', { id: req.params.id })
    .orderBy('withdrawal.date', 'DESC')
    .skip(req.page.skip)
    .take(req.page.size)
    .getManyAndCount();

  return page(req.page, count, withdrawals);
});
