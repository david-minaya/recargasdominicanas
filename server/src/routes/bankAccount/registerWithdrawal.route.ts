import { permission } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { INSUFFICIENT_FUNDS, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { notEmpty, number, decimal, date, optional } from '../../utils/validators';
import { WITHDRAW_CREATE } from '../../constants/permissions';
import { BankAccountRepo } from '../../repositories/bankAccount.repo';
import { Withdrawal } from '../../entities/withdrawal.entity';
import { params } from '../../middlewares/params';
import { body } from '../../middlewares/body';
import { BaseRequest } from '../../interfaces/baseRequest';

interface Req extends BaseRequest {
  params: { 
    id: number;
  }
  body: {
    balance: number;
    date: string;
    description?: string;
  }
}

permission(WITHDRAW_CREATE);
params({ id: number })
body({ 
  balance: decimal, 
  date: date, 
  description: [notEmpty, optional]
})
post('/:id/register-withdrawal');
export const registerWithdrawal = route(async (req: Req) => {

  const { id } = req.params;

  const { 
    balance,
    date,
    description = ''
  } = req.body;

  const bankAccount = await BankAccountRepo.getById(id);

  if (!bankAccount) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  if (bankAccount.balance < balance) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  const withdrawal = Withdrawal.create({
    date,
    description,
    bankAccount,
    balance: {
      date,
      amount: balance
    }
  });

  await Withdrawal.save(withdrawal);
});
