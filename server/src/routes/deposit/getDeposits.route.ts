import { DEPOSIT_READ } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

permission(DEPOSIT_READ)
get('/')
export const getDeposits = route(async () => {
  return Deposit.createQueryBuilder('deposit')
    .leftJoinAndSelect('deposit.user', 'user')
    .leftJoinAndMapOne('deposit.business', Business, 'business', 'business.userId = user.id')
    .leftJoinAndSelect('deposit.balance', 'balance')
    .leftJoinAndSelect('deposit.bankAccount', 'bankAccount')
    .leftJoinAndSelect('bankAccount.bank', 'bank')
    .orderBy('deposit.date', 'DESC')
    .where('deposit.userId = business.userId')
    .orWhere('deposit.userId IS NULL')
    .getMany();
});
