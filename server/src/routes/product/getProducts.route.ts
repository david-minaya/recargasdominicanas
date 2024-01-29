import { Like } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { PRODUCT_READ } from '../../constants/permissions';
import { number, optional, query, string } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';

validate({
  name: [string, optional, query],
  limit: [number, optional, query]
})

permission(PRODUCT_READ)
get('/')
export const getProducts = route(async ({ query }) => {
  return Product.find({ 
    where: { name: Like(`%${query.name || ''}%`) },
    take: parseInt(query.limit as string)
  });
});
