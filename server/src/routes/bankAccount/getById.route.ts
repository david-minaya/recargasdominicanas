import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { SYSTEM_READ } from '../../constants/permissions';
import { BaseRequest } from '../../interfaces/baseRequest';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { BankAccountRepo } from '../../repositories/bankAccount.repo';
import { get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { number } from '../../utils/validators';

interface Req extends BaseRequest {
  params: {
    id: number;
  }
}

permission(SYSTEM_READ)
params({ id: number })
get('/:id')
export const getById = route(async (req: Req) => {

  const bankAccount = await BankAccountRepo.getById(req.params.id);

  if (!bankAccount) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  return bankAccount;
});
