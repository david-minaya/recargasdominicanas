import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { Transaction } from '../../entities/transaction.entity';
import { BUSINESS_USER_READ } from '../../constants/permissions';
import { pagination } from '../../middlewares/pagination';

pagination()
permission(BUSINESS_USER_READ)
get('/transactions')
export const getTransactions = route(async req => {

  const transactionsAndCount = await Transaction.createQueryBuilder('transaction')
    .leftJoin('transaction.business', 'business')
    .leftJoinAndSelect('transaction.product', 'product')
    .leftJoinAndSelect('product.pin', 'pin')
    .leftJoinAndSelect('transaction.profits', 'profit')
    .leftJoinAndSelect('transaction.contract', 'contract')
    .where('transaction.businessUserId = :businessUserId')
    .andWhere('profit.userId = business.userId')
    .orderBy('transaction.date', 'DESC')
    .skip(req.page.skip)
    .take(req.page.size)
    .setParameters({ businessUserId: req.businessUser.id })
    .getManyAndCount();

  const count = transactionsAndCount[1];
  const transactions = mapEntities(transactionsAndCount[0]);
  const groupedByDate = groupByDate(transactions);

  // TODO: The response of this route uses a legacy pagination structure, this 
  // structure can't be updated to the new one, because this route is used for 
  // the mobile application. Before we want to update the response of this route, 
  // we need to ensure that all the users' mobile applications are updated.

  return {
    page: req.page.index,
    size: req.page.size,
    pages: Math.ceil(count / req.page.size),
    total: count,
    data: groupedByDate
  }
});

function mapEntities(transactions: Transaction[]) {
  return transactions.map(transaction => ({
    ...transaction,
    profits: undefined,
    profit: transaction.profits[0].amount
  }))
}

function groupByDate(transactions: any[]) {

  const groupByDate: { date: Date, transactions: Transaction[] }[] = [];

  for (const transaction of transactions) {

    const group = groupByDate.find(group => 
      group.date.toLocaleDateString() === transaction.date.toLocaleDateString()
    );

    if (!group) {
      groupByDate.push({ date: transaction.date, transactions: [transaction] });
    } else {
      group.transactions.push(transaction);
    }
  }

  return groupByDate;
}
