import { Router } from 'express';
import { add } from './add.route';
import { getAll } from './getAll.route';
import { getCurrent } from './getCurrent.route';
import { publish } from './publish.route';
import { update } from './update.route';

const route = Router();

route.use(getCurrent);
route.use(getAll);
route.use(add);
route.use(update);
route.use(publish);

export const appReleaseRoute = route;
