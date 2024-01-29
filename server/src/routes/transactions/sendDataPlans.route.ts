import { INSUFFICIENT_FUNDS } from '../../constants/error-types';
import { SEND_DATA_PLAN } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { DataPlan } from '../../entities/dataPlan.entity';
import { TransactionCounter } from '../../entities/transactionCounter.entity';
import { permission, validate } from '../../middlewares';
import { BusinessRepo } from '../../repositories/business.repo';
import { ProviderRepo } from '../../repositories/Provider.repo';
import { TransactionRepo } from '../../repositories/transaction.repo';
import { post, route } from '../../utils/routeBuilder';
import { selectProvider } from '../../utils/selectProvider';
import { ServerError } from '../../utils/serverError';
import { number, numeric, string } from '../../utils/validators';

permission(SEND_DATA_PLAN);

validate({ 
  phone: numeric, 
  planId: string,
  productId: number 
});

post('/send-data-plan')
export const sendDataPlan = route(async req => {

  const { 
    phone, 
    planId,
    productId 
  } = req.body;

  const ref = await TransactionCounter.nextValue();
  const dataPlan = await DataPlan.findOneOrFail({ id: planId });
  const providerProduct = await ProviderRepo.getProduct(productId, dataPlan.price);
  const provider = await selectProvider(providerProduct.provider.id);
  const business = await getBusiness(req.business.id);
  const balance = await BusinessRepo.getBalance(business.id);

  if (balance < dataPlan.price) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  await provider.sendDataPlan(providerProduct.key, phone, dataPlan, ref);

  return TransactionRepo.save({
    phone: phone,
    amount: dataPlan.price,
    business: business,
    businessUser: req.businessUser,
    provider: provider,
    providerProduct: providerProduct
  });
});

async function getBusiness(id: number) {
  return Business.createQueryBuilder('business')
    .leftJoinAndSelect('business.user', 'user')
    .where('business.id = :id', { id })
    .getOneOrFail();
}
