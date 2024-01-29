import { PROVIDER_UPDATE } from '../../constants/permissions';
import { ProviderConfig } from '../../entities/providerConfig.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { number, string } from '../../utils/validators';

permission(PROVIDER_UPDATE)

validate({
  id: number,
  name: string,
  value: string
})

patch('/configs/:id')
export const updateConfig = route(async req => {
  return ProviderConfig.save(ProviderConfig.create({
    id: parseInt(req.params.id),
    name: req.body.name,
    value: req.body.value
  }))
});
