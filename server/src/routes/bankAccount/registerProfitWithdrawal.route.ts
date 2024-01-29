import { permission } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { INSUFFICIENT_FUNDS, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { notEmpty, number, decimal, date, optional } from '../../utils/validators';
import { WITHDRAW_CREATE } from '../../constants/permissions';
import { BankAccountRepo } from '../../repositories/bankAccount.repo';
import { ProfitWithdrawal } from '../../entities/profitWithdrawal.entity';
import { params } from '../../middlewares/params';
import { body } from '../../middlewares/body';
import { Provider } from '../../entities/provider.entity';
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

permission(WITHDRAW_CREATE)
params({ id: number })
body({ 
  balance: decimal, 
  date: date, 
  description: [notEmpty, optional]
})
post('/:id/register-profit-withdrawal')
export const registerProfitWithdrawal = route(async (req: Req) => {

  const { 
    balance,
    date,
    description = '',
  } = req.body;

  const bankAccount = await BankAccountRepo.getById(req.params.id);
  const profit = await getProfit();

  if (!bankAccount) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  if (balance > bankAccount.balance || balance > profit) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  const profitWithdrawal = ProfitWithdrawal.create({
    withdrawal: {
      date: date,
      description: description,
      bankAccount: { id: req.params.id },
      balance: {
        date: date,
        amount: balance
      }
    }
  });

  await ProfitWithdrawal.save(profitWithdrawal);
});

async function getProfit() {

  const profit = await Provider.createQueryBuilder('provider')
    .select('IFNULL(SUM(profit.amount), 0)', 'total')
    .leftJoin('provider.transactions', 'transaction')
    .leftJoin('transaction.profits', 'profit', 'profit.userId = provider.userId')
    .andWhere('transaction.cancelled = false')
    .getRawOne();

  const profitWithdrawal = await ProfitWithdrawal.createQueryBuilder('profitWithdrawal')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('profitWithdrawal.withdrawal', 'withdrawal')
    .leftJoin('withdrawal.balance', 'balance')
    .getRawOne();

  return profit.total - profitWithdrawal.total;
}
