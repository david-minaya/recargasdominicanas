import { Router } from 'express';
import { getSummary } from './getSummary.route';
import { getSalesByMonth } from './getSalesByMonth.route';
import { getSalesByday } from './getSalesByDay.route';
import { getSalesByProducts } from './getSalesByProducts.route';

const route = Router();

route.use(getSummary);
route.use(getSalesByday);
route.use(getSalesByMonth);
route.use(getSalesByProducts);

export const finances = route;
