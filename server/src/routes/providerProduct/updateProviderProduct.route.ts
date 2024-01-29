import { PROVIDER_PRODUCT_UPDATE } from '../../constants/permissions';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { boolean, decimal, notEmpty, number, optional, string } from '../../utils/validators';

permission(PROVIDER_PRODUCT_UPDATE)

validate({
  id: number,
  key: [string, notEmpty, optional],
  profit: [decimal, optional],
  productId: [number, optional],
  enabled: [boolean, optional]
})

patch('/:id')
export const updateProviderProduct = route(async ({ params, body }) => {

  const providerProduct = await ProviderProduct.findOneOrFail(params.id);
  
  providerProduct.key = body.key;
  providerProduct.profit = body.profit;
  providerProduct.product.id = body.productId;
  providerProduct.enabled = body.enabled;
  
  await providerProduct.save();
  await providerProduct.reload();

  return providerProduct;
});
