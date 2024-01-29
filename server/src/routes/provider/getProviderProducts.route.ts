import { PROVIDER_READ } from '../../constants/permissions';
import { ProviderProduct } from '../../entities/providerProduct.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { string } from '../../utils/validators';

permission(PROVIDER_READ)
validate({ id: string })
get('/:id/provider-products')
export const getProviderProducts = route(async (req) => {
  return ProviderProduct.find({ 
    relations: ['provider', 'product'],
    where: { 
      provider: { 
        id: req.params.id 
      } 
    }
  });
});
