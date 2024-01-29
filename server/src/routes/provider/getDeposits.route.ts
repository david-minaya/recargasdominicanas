import { PROVIDER_READ } from '../../constants/permissions';
import { Deposit } from '../../entities/deposit.entity';
import { Provider } from '../../entities/provider.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { string } from '../../utils/validators';

permission(PROVIDER_READ)
validate({ id: string })
get('/:id/deposits')
export const getDeposits = route(async req => {
  return Deposit.createQueryBuilder('deposit')
    .leftJoinAndSelect('deposit.bankAccount', 'bankAccount')
    .leftJoinAndSelect('bankAccount.bank', 'bank')
    .leftJoinAndSelect('deposit.balance', 'balance')
    .leftJoin(Provider, 'provider', 'provider.userId = deposit.userId')
    .orderBy('deposit.date', 'DESC')
    .where('provider.id = :id', { id: req.params.id })
    .getMany()
})
