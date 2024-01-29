import { PROVIDER_CREATE } from '../../constants/permissions';
import { ProviderConfig } from '../../entities/providerConfig.entity';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { number, string } from '../../utils/validators';

permission(PROVIDER_CREATE)

validate({
  id: number,
  name: string,
  value: string
})

post('/:id/configs')
export const addConfig = route(async req => {
  return ProviderConfig.save(ProviderConfig.create({
    name: req.body.name,
    value: req.body.value,
    provider: { 
      id: parseInt(req.params.id)
    }
  }))
});
