import { DEPOSIT_CREATE } from '../../constants/permissions';
import { Deposit } from '../../entities/deposit.entity';
import { permission } from '../../middlewares';
import { body } from '../../middlewares/body';
import { params } from '../../middlewares/params';
import { post, status, route } from '../../utils/routeBuilder';
import { date, decimal, number, optional, string } from '../../utils/validators';
import { BaseRequest } from '../../interfaces/baseRequest';
import { Provider } from '../../entities/provider.entity';
import { ServerError } from '../../utils/serverError';
import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { BankAccount } from '../../entities/bankAccount.entity';

interface Request extends BaseRequest {
  params: {
    id: number;
  },
  body: {
    bankAccountId: number;
    date: string;
    balance: number;
    reference?: string;
  }
}

permission(DEPOSIT_CREATE)
params({ id: number })
body({
  bankAccountId: number,
  date: date,
  balance: decimal,
  reference: [string, optional]
})
status(201)
post('/:id/register-deposit')
export const registerDeposit = route(async (req: Request) => {
  
  const { 
    bankAccountId,
    date,
    balance,
    reference
  } = req.body;

  const provider = await Provider.findOne({ 
    where: { id: req.params.id },
    relations: ['user']
  });

  const bankAccount = await BankAccount.findOne(bankAccountId);

  if (!provider || !bankAccount) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  const deposit = Deposit.create({
    user: provider.user,
    date: date,
    reference: reference,
    assignedBy: { id: req.admin.id },
    bankAccount: bankAccount,
    balance: {
      amount: balance,
      date: date,
      user: provider.user
    }
  });

  return deposit.save();
});
