import { Router } from 'express';
import { getAll } from './getAll.router';
import { getBusiness } from './getBusiness.route';
import { getBusinessTransactions } from './getBusinessTransactions.route';
import { getBusinessSalesReports } from './getBusinessSalesReports.route';
import { getBusinessDeposits } from './getBusinessDeposits.route';
import { getAuth } from './getAuth.route';
import { create } from './create.route';
import { createTempPassword } from './createTempPassword.route';
import { update } from './update.route';
import { resetPassword } from './resetPassword.route';
import { login } from './login.route';
import { exportBusinessTransactions } from './exportBusinessTransactions.route';

const route = Router();

route.use(getAll);
route.use(getAuth);
route.use(getBusiness);
route.use(getBusinessTransactions);
route.use(getBusinessSalesReports);
route.use(getBusinessDeposits);
route.use(exportBusinessTransactions);
route.use(login);
route.use(create);
route.use(update);
route.use(createTempPassword);
route.use(resetPassword);

export const customerRoute = route;
