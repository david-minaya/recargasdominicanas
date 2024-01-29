import { CUSTOMER } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(CUSTOMER)
validate({ id: number })
get('/business/:id/deposits')
export const getBusinessDeposits = route(async (req) => {
  return Deposit.createQueryBuilder('deposit')
    .select(['deposit.id', 'deposit.date', 'bankAccount.name', 'bank.image', 'balance.amount'])
    .leftJoin('deposit.bankAccount', 'bankAccount')
    .leftJoin('bankAccount.bank', 'bank')
    .leftJoin('deposit.balance', 'balance')
    .leftJoin(Business, 'business', 'business.userId = deposit.userId')
    .leftJoin('business.customer', 'customer')
    .where('business.id = :businessId', { businessId: req.params.id })
    .andWhere('customer.id = :customerId', { customerId: req.customer.id })
    .orderBy('deposit.date', 'DESC')
    .getMany()
});
