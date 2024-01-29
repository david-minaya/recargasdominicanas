import { PROVIDER_READ } from '../../constants/permissions';
import { BaseRequest } from '../../interfaces/baseRequest';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { get, route } from '../../utils/routeBuilder';
import { selectProvider } from '../../utils/selectProvider';
import { number } from '../../utils/validators';

interface Req extends BaseRequest {
  params: {
    id: number;
  }
}

permission(PROVIDER_READ)
params({ id: number })
get('/:id/external-balance')
export const getExternalBalance = route(async (req: Req) => {
  const provider = await selectProvider(req.params.id);
  return provider.getBalance();
});
