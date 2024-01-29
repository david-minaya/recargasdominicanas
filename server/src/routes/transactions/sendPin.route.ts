import { Business } from '../../entities/business.entity';
import { ServerError } from '../../utils/serverError';
import { number } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { INSUFFICIENT_FUNDS } from '../../constants/error-types';
import { BUSINESS_USER_SEND_TRANSACTION } from '../../constants/permissions';
import { TransactionRepo } from '../../repositories/transaction.repo';
import { selectProvider } from '../../utils/selectProvider';
import { BusinessRepo } from '../../repositories/business.repo';
import { ProviderRepo } from '../../repositories/Provider.repo';

const validator = {
  productId: number,
  price: number
}

permission(BUSINESS_USER_SEND_TRANSACTION)
validate(validator)
post('/send-pin')
export const sendPin = route(async req => {
  
  const { productId, price } = req.body;

  const providerProduct = await ProviderRepo.getProduct(productId, price);
  const provider = await selectProvider(providerProduct.provider.id);
  const business = await getBusiness(req.business.id);
  const balance = await BusinessRepo.getBalance(business.id);

  if (balance < price) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  const pin = await provider.sendPin(providerProduct.key, price);

  return TransactionRepo.save({
    pin: pin,
    amount: price,
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
