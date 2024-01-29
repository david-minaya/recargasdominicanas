import { PROVIDER_PRODUCT_CREATE } from '../../constants/permissions';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { decimal, notEmpty, number, string } from '../../utils/validators';

permission(PROVIDER_PRODUCT_CREATE)

validate({
  profit: decimal,
  key: [string, notEmpty],
  productId: number,
  providerId: number
})

post('/')
export const addProviderProduct = route(async ({ body }) => {
  return ProviderProduct.create({
    key: body.key,
    profit: body.profit,
    product: { id: body.productId },
    provider: { id: body.providerId }
  }).save();
});
