import { explicitRes, post, route } from '../../utils/routeBuilder';

explicitRes()
post('/logout')
export const logout = route(async (req, res) => {
  req.session.destroy(() => res.sendStatus(200));
});
