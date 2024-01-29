import { Business } from '../../entities/business.entity';
import { ServerError } from '../../utils/serverError';
import { number, numeric } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { INSUFFICIENT_FUNDS } from '../../constants/error-types';
import { BUSINESS_USER_SEND_TRANSACTION } from '../../constants/permissions';
import { TransactionCounter } from '../../entities/transactionCounter.entity';
import { TransactionRepo } from '../../repositories/transaction.repo';
import { selectProvider } from '../../utils/selectProvider';
import { BusinessRepo } from '../../repositories/business.repo';
import { ProviderRepo } from '../../repositories/Provider.repo';

const validator = {
  phone: numeric,
  amount: number,
  productId: number
}

permission(BUSINESS_USER_SEND_TRANSACTION)
validate(validator);
post('/send-transaction')
export const sendTransaction = route(async req => {
  
  const { phone, amount, productId } = req.body;

  const ref = await TransactionCounter.nextValue();
  const providerProduct = await ProviderRepo.getProduct(productId, amount);
  const provider = await selectProvider(providerProduct.provider.id);
  const business = await getBusiness(req.business.id);
  const balance = await BusinessRepo.getBalance(business.id);

  if (balance < amount) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  await provider.sendTransaction(providerProduct.key, phone, amount, ref);

  return TransactionRepo.save({
    phone: phone,
    amount: amount,
    ref: ref,
    business: business,
    businessUser: req.businessUser,
    provider: provider,
    providerProduct: providerProduct
  });
});

async function getBusiness(businessId: number) {
  return Business.findOneOrFail({
    where: { id: businessId },
    relations: ['user']
  });
}
