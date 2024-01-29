import { Transaction } from '../../entities/transaction.entity';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { number } from '../../utils/validators';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { TRANSACTION_CANCEL } from '../../constants/permissions';
import { selectProvider } from '../../utils/selectProvider';

import { 
  CANCELLATION_TIME_EXPIRED, 
  TRANSACTION_ALREDY_CANCELLED, 
  UNAUTHORIZED 
} from '../../constants/error-types';

permission(TRANSACTION_CANCEL)
validate({ id: number })
post('/cancel-invoice/:id')
export const cancelInvoice = route(async req => {

  const transaction = await Transaction.createQueryBuilder('transaction')
    .leftJoinAndSelect('transaction.provider', 'provider')
    .leftJoinAndSelect('transaction.product', 'product')
    .leftJoinAndSelect('transaction.contract', 'contract')
    .where('transaction.id = :id')
    .andWhere(req.businessUser ? 'transaction.businessUserId = :businessUserId' : 'true')
    .setParameters({ id: req.params.id, businessUserId: req.businessUser.id })
    .getOne();

  if (!transaction) {
    throw new ServerError(403, UNAUTHORIZED);
  }

  if (transaction.cancelled) {
    throw new ServerError(409, TRANSACTION_ALREDY_CANCELLED);
  }

  if (Date.now() > transaction.date.getTime() + (1000 * 60 * 5)) {
    throw new ServerError(409, CANCELLATION_TIME_EXPIRED);
  }

  const providerProduct = await ProviderProduct.createQueryBuilder('providerProduct')
    .leftJoin('providerProduct.provider', 'provider')
    .where('providerProduct.productId = :productId')
    .andWhere('provider.enabled = true')
    .andWhere('providerProduct.enabled = true')
    .setParameters({ productId: transaction.product.id })
    .getOneOrFail();

  const provider = await selectProvider(transaction.provider.id);
  await provider.cancelInvoice(providerProduct.key, transaction.contract.nic, transaction!.reference);

  transaction.cancelled = true;

  await transaction.save();
});
