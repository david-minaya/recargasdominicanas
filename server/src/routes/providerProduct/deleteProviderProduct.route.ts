import { PROVIDER_PRODUCT_DELETE } from '../../constants/permissions';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { permission, validate } from '../../middlewares';
import { remove, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(PROVIDER_PRODUCT_DELETE)
validate({ id: number })
remove('/:id')
export const deleteProviderProduct = route(async req => {
  const providerProduct = await ProviderProduct.findOneOrFail(req.params.id);
  await providerProduct.softRemove();
});
