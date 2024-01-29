import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { Transaction } from '../../entities/transaction.entity';
import { BUSINESS_USER_READ } from '../../constants/permissions';
import { pagination } from '../../middlewares/pagination';
import { ServerError } from '../../utils/serverError';
import { CANCELLATION_TIME_EXPIRED, NOT_FOUND_EXCEPTION } from '../../constants/error-types';

pagination()
permission(BUSINESS_USER_READ)
get('/last-topup')
export const getLastTopup = route(async req => {

  const transaction = await Transaction.createQueryBuilder('transaction')
    .leftJoin('transaction.business', 'business')
    .leftJoinAndSelect('transaction.product', 'product')
    .leftJoinAndSelect('transaction.profits', 'profit')
    .where('transaction.businessUserId = :businessUserId')
    .andWhere('profit.userId = business.userId')
    .andWhere('product.type = "Recarga"')
    .orderBy('transaction.date', 'DESC')
    .take(1)
    .setParameters({ businessUserId: req.businessUser.id })
    .getOne();

  if (!transaction) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  if (Date.now() > transaction.date.getTime() + (1000 * 60 * 5)) {
    throw new ServerError(409, CANCELLATION_TIME_EXPIRED);
  }

  return {
    ...transaction,
    profits: undefined,
    profit: transaction.profits[0].amount
  }
});
