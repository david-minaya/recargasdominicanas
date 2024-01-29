import { BANK_READ } from '../../constants/permissions';
import { Bank } from '../../entities/bank.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

permission(BANK_READ)
get('/')
export const getBanks = route(async () => {
  return Bank.find();
});
