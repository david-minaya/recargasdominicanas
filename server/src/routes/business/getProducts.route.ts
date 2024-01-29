import { BUSINESS_READ_PRODUCTS } from '../../constants/permissions';
import { Product } from '../../entities/product.entity';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

permission(BUSINESS_READ_PRODUCTS);
get('/products')
export const getProducts = route(async () => {
  return Product.find({ enabled: true });
});
