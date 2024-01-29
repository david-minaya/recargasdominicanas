import { Router } from 'express';
import { getBankAccounts } from './getBankAccounts.route';

const route = Router();

route.use(getBankAccounts);

export const systemRoute = route;
