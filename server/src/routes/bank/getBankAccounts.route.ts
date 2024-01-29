import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { SYSTEM_READ } from '../../constants/permissions';
import { BankAccount } from '../../entities/bankAccount.entity';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { number } from '../../utils/validators';

permission(SYSTEM_READ)
params({ id: number })
get('/:id/bank-accounts')
export const getBankAccounts = route(async req => {

  const bankAccounts = await BankAccount.createQueryBuilder('bankAccount')
    .leftJoin('bankAccount.bank', 'bank')
    .where('bankAccount.userId IS NULL')
    .andWhere('bank.id = :id', { id: req.params.id })
    .getMany();

  if (!bankAccounts) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  return bankAccounts;
});
