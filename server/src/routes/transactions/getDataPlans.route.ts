import { TRANSACTION_READ } from '../../constants/permissions';
import { DataPlan } from '../../entities/dataPlan.entity';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { selectProvider } from '../../utils/selectProvider';
import { number, numeric } from '../../utils/validators';

permission(TRANSACTION_READ)
validate({ productId: number, phone: numeric })
get('/data-plans/:productId/:phone')
export const getDataPlans = route(async req => {
  const providerProduct = await getProviderProduct(parseInt(req.params.productId));
  const provider = await selectProvider(providerProduct.provider.id);
  const dataPlans = await provider.getDataPlans(providerProduct.key, req.params.phone);
  await DataPlan.save(DataPlan.create(dataPlans));
  return dataPlans;
});

async function getProviderProduct(productId: number) {
  return ProviderProduct.createQueryBuilder('providerProduct')
    .leftJoinAndSelect('providerProduct.product', 'product')
    .leftJoinAndSelect('providerProduct.provider', 'provider')
    .where('product.id = :productId')
    .andWhere('provider.enabled = true')
    .andWhere('providerProduct.enabled = true')
    .setParameters({ productId })
    .getOneOrFail();
}
