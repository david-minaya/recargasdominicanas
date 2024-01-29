import { PROVIDER_DELETE } from '../../constants/permissions';
import { ProviderConfig } from '../../entities/providerConfig.entity';
import { permission, validate } from '../../middlewares';
import { remove, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(PROVIDER_DELETE)
validate({ id: number })
remove('/configs/:id')
export const deleteConfig = route(async req => {
  return ProviderConfig.delete(req.params.id);
});
