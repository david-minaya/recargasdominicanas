import { Router } from 'express';
import { addBank } from './addBank.route';
import { getBanks } from './getBanks.route';
import { updateBank } from './updateBank.route';
import { getBankAccounts } from './getBankAccounts.route';

const route = Router();

route.use(getBanks);
route.use(getBankAccounts);
route.use(addBank);
route.use(updateBank);

export const bankRoute = route;
