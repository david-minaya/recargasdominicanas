import { Router } from 'express';
import { registerDeposit } from './registerDeposit.route';
import { getDeposits } from './getDeposits.route';
import { assignDeposit } from './assignDeposit.route';

const route = Router();

route.use(getDeposits);
route.use(registerDeposit);
route.use(assignDeposit);

export const depositRoute = route;
