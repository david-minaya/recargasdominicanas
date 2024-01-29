import { PROVIDER_UPDATE } from '../../constants/permissions';
import { Provider } from '../../entities/provider.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { boolean, number } from '../../utils/validators';

permission(PROVIDER_UPDATE)
validate({ id: number, enabled: boolean })
patch('/:id')
export const update = route(async req => {
  await Provider.update(req.params.id, req.body);
});
