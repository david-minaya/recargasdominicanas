import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';
import { PROVIDER_READ } from '../../constants/permissions';
import { ProviderRepo } from '../../repositories/Provider.repo';
import { BaseRequest } from '../../interfaces/baseRequest';

interface Req extends BaseRequest {
  params: {
    id: number;
  }
}

permission(PROVIDER_READ)
validate({ id: number })
get('/:id')
export const getById = route(async (req: Req) => {
  return ProviderRepo.getOne(req.params.id);
});
