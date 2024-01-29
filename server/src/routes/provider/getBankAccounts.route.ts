import { BankAccount } from '../../entities/bankAccount.entity';
import { Deposit } from '../../entities/deposit.entity';
import { Provider } from '../../entities/provider.entity';
import { string } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { PROVIDER_READ } from '../../constants/permissions';

permission(PROVIDER_READ)
validate({ id: string })
get('/:id/bank-accounts')
export const getBankAccounts = route(async ({ params }) => {
  return BankAccount.createQueryBuilder('bankAccount')
    .select('bankAccount.*')
    .addSelect('JSON_OBJECT("image", bank.image)', 'bank')
    .addSelect(
      subquery => subquery
        .select('SUM(balance.amount)', 'balance')
        .from(Deposit, 'deposit')
        .leftJoin('deposit.balance', 'balance')
        .where('deposit.bankAccountId = bankAccount.id'),
      'balance'
    )
    .leftJoin('bankAccount.bank', 'bank')
    .leftJoin(Provider, 'provider', 'provider.userId = bankAccount.userId')
    .where('provider.id = :id', { id: params.id })
    .getRawMany();
});
