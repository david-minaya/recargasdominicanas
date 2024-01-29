import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { PROVIDER_READ } from '../../constants/permissions';
import { ProviderRepo } from '../../repositories/Provider.repo';

permission(PROVIDER_READ)
get('/')
export const getAll = route(async () => {
  return ProviderRepo.getAll();
});
