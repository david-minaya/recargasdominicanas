import { PRODUCT_READ } from '../../constants/permissions';
import { BaseRequest } from '../../interfaces/baseRequest';
import { permission } from '../../middlewares';
import { params } from '../../middlewares/params';
import { query } from '../../middlewares/query';
import { ProviderRepo } from '../../repositories/Provider.repo';
import { get, route } from '../../utils/routeBuilder';
import { date, number } from '../../utils/validators';

interface Req extends BaseRequest {
  params: {
    id: number;
  }
  query: {
    startDate: string;
    endDate: string;
  }
}

permission(PRODUCT_READ)
params({ id: number })
query({ startDate: date, endDate: date })
get('/:id/sales')
export const getSales = route(async (req: Req) => {
  return ProviderRepo.getSales(req.params.id, new Date(req.query.startDate), new Date(req.query.endDate))
});
