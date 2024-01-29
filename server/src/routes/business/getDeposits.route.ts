import { BUSINESS_READ_DEPOSITS } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(BUSINESS_READ_DEPOSITS)
validate({ id: number })
get('/:id/deposits')
export const getDeposits = route(async (req) => {
  return Deposit.createQueryBuilder('deposit')
    .leftJoinAndSelect('deposit.bankAccount', 'bankAccount')
    .leftJoinAndSelect('bankAccount.bank', 'bank')
    .leftJoinAndSelect('deposit.balance', 'balance')
    .leftJoin(Business, 'business', 'business.userId = deposit.userId')
    .orderBy('deposit.date', 'DESC')
    .where('business.id = :id', { id: req.params.id })
    .getMany()
})
