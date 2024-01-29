import { Business } from '../../entities/business.entity';
import { ServerError } from '../../utils/serverError';
import { decimal, number, string } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { INSUFFICIENT_FUNDS, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { BUSINESS_USER_SEND_TRANSACTION } from '../../constants/permissions';
import { TransactionCounter } from '../../entities/transactionCounter.entity';
import { TransactionRepo } from '../../repositories/transaction.repo';
import { selectProvider } from '../../utils/selectProvider';
import { BusinessRepo } from '../../repositories/business.repo';
import { ProviderRepo } from '../../repositories/Provider.repo';
import { Contract } from '../../entities/contract.entity';

const validator = {
  productId: number,
  nic: string,
  amount: decimal,
}

permission(BUSINESS_USER_SEND_TRANSACTION)
validate(validator);
post('/pay-invoice')
export const payInvoice = route(async req => {
  
  const { productId, nic, amount } = req.body;

  const ref = await TransactionCounter.nextValue();
  const contract = await Contract.findOne({ nic });
  const providerProduct = await ProviderRepo.getProduct(productId, 0);
  const provider = await selectProvider(providerProduct.provider.id);
  const business = await getBusiness(req.business.id);
  const balance = await BusinessRepo.getBalance(business.id);

  if (!contract) {
    throw new ServerError(400, NOT_FOUND_EXCEPTION);
  }

  if (balance < amount) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  await provider.payInvoice(providerProduct.key, nic, amount, ref);

  return TransactionRepo.saveInvoice({
    amount: amount,
    ref: ref,
    business: business,
    businessUser: req.businessUser,
    provider: provider,
    providerProduct: providerProduct,
    contract: contract
  });
});

async function getBusiness(businessId: number) {
  return Business.findOneOrFail({
    where: { id: businessId },
    relations: ['user']
  });
}
