import { PROVIDER_READ } from '../../constants/permissions';
import { ProviderConfig } from '../../entities/providerConfig.entity';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(PROVIDER_READ)
validate({ id: number })
get('/:id/configs')
export const getConfigs = route(async req => {
  return ProviderConfig.find({ 
    where: { 
      provider: { 
        id: req.params.id 
      }
    }
  })
});
