import { SYSTEM_READ } from '../../constants/permissions';
import { permission } from '../../middlewares';
import { BankAccountRepo } from '../../repositories/bankAccount.repo';
import { get, route } from '../../utils/routeBuilder';

permission(SYSTEM_READ)
get('/')
export const getAll = route(async () => {
  return BankAccountRepo.getAll();
});
