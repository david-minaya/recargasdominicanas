import { FINANCES } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { ProfitWithdrawal } from '../../entities/profitWithdrawal.entity';
import { Provider } from '../../entities/provider.entity';
import { Transaction } from '../../entities/transaction.entity';
import { Withdrawal } from '../../entities/withdrawal.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { permission } from '../../middlewares';
import { query } from '../../middlewares/query';
import { get, route } from '../../utils/routeBuilder';
import { date } from '../../utils/validators';

interface Total {
  total: number;
}

interface Req extends BaseRequest {
  query: {
    startDate: string;
    endDate: string;
  }
}

permission(FINANCES)
query({ startDate: date, endDate: date })
get('/summary')
export const getSummary = route(async (req: Req) => {

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  const [
    providersBalance,
    banksBalance,
    asignedBalance,
    generalProfit,
    sales,
    profit
  ] = await Promise.all([
    getProvidersBalance(),
    getBanksBalance(),
    getAsignedBalance(),
    getGeneralProfit(),
    getSales(startDate, endDate),
    getProfit(startDate, endDate)
  ]);
    
  return {
    balance: providersBalance,
    balanceAsigned: asignedBalance,
    banksBalance: banksBalance,
    capital: providersBalance + banksBalance,
    generalProfit: generalProfit,
    sales: sales,
    profit: profit
  }
});

async function getProvidersBalance() {

  const balance = await Provider.createQueryBuilder('provider')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('provider.user', 'user')
    .leftJoin('user.balances', 'balance')
    .leftJoin('balance.transaction', 'transaction')
    .where('transaction.cancelled = false')
    .orWhere('transaction.id IS NULL')
    .getRawOne<Total>();

  return balance!.total;
}

async function getGeneralProfit() {

  const profitQuery = Provider.createQueryBuilder('provider')
    .select('IFNULL(SUM(profit.amount), 0)', 'total')
    .leftJoin('provider.transactions', 'transaction')
    .leftJoin('transaction.profits', 'profit', 'profit.userId = provider.userId')
    .andWhere('transaction.cancelled = false');

  const profitWithdrawalQuery = ProfitWithdrawal.createQueryBuilder('profitWithdrawal')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('profitWithdrawal.withdrawal', 'withdrawal')
    .leftJoin('withdrawal.balance', 'balance');

  const [profit, profitWithdrawal] = await Promise.all([
    profitQuery.getRawOne<Total>(),
    profitWithdrawalQuery.getRawOne<Total>()
  ])

  return profit!.total - profitWithdrawal!.total;
}

async function getBanksBalance() {

  const depositQuery = Deposit.createQueryBuilder('deposit')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('deposit.balance', 'balance')
    .leftJoin('deposit.bankAccount', 'bankAccount')
    .where('bankAccount.userId IS NULL');
  
  const withdrawalQuery = Withdrawal.createQueryBuilder('withdrawal')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('withdrawal.balance', 'balance')
    .leftJoin('withdrawal.bankAccount', 'bankAccount')
    .where('bankAccount.userId IS NULL');

  const [deposit, withdrawal] = await Promise.all([
    depositQuery.getRawOne<Total>(),
    withdrawalQuery.getRawOne<Total>()
  ]);

  return deposit!.total - withdrawal!.total;
}

async function getAsignedBalance() {

  const balance = await Business.createQueryBuilder('business')
    .select('IFNULL(SUM(balance.amount), 0)', 'total')
    .leftJoin('business.user', 'user')
    .leftJoin('user.balances', 'balance')
    .leftJoin('balance.transaction', 'transaction')
    .where('transaction.cancelled = false')
    .orWhere('transaction.id IS NULL')
    .getRawOne<Total>();

  return balance!.total;
}

async function getSales(startDate: Date, endDate: Date) {

  const sales = await Transaction.createQueryBuilder('transaction')
    .select('IFNULL(SUM(transaction.amount), 0)', 'total')
    .where('transaction.cancelled = false')
    .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
    .setParameters({ startDate, endDate })
    .getRawOne<Total>();

  return sales!.total;
}

async function getProfit(startDate: Date, endDate: Date) {

  const profit = await Provider.createQueryBuilder('provider')
    .select('IFNULL(SUM(profit.amount), 0)', 'total')
    .leftJoin('provider.user', 'user')
    .leftJoin('user.profits', 'profit')
    .leftJoin('profit.transaction', 'transaction')
    .where('profit.date >= :startDate AND profit.date < :endDate')
    .andWhere('transaction.cancelled = false')
    .setParameters({ startDate, endDate })
    .getRawOne<Total>();

  return profit!.total;
}
