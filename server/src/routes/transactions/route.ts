import { Router } from 'express';
import { cancelInvoice } from './cancelInvoice.route';
import { getDataPlans } from './getDataPlans.route';
import { getInvoice } from './getInvoice.route';
import { payInvoice } from './payInvoice.route';
import { sendDataPlan } from './sendDataPlans.route';
import { sendPin } from './sendPin.route';

const route = Router();

route.use(getDataPlans);
route.use(getInvoice);
route.use(sendDataPlan);
route.use(sendPin);
route.use(payInvoice);
route.use(cancelInvoice);

export const transactionsRoute = route;
