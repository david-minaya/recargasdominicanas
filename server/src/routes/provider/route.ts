import { Router } from 'express';
import { getTransactions } from './getTransactions.route';
import { getDeposits } from './getDeposits.route';
import { getById } from './getById.route';
import { getProviderProducts } from './getProviderProducts.route';
import { getAll } from './getAll.route';
import { getSales } from './getSales.route';
import { getBankAccounts } from './getBankAccounts.route';
import { getConfigs } from './getConfigs.route';
import { getSalesByday } from './getSalesByDay.route';
import { getSalesByMonth } from './getSalesByMonth.route';
import { getSalesByProducts } from './getSalesByProducts.route';
import { getExternalBalance } from './getExternalBalance.route';
import { addConfig } from './addConfig.route';
import { update } from './update.route';
import { updateConfig } from './updateConfig.route';
import { registerDeposit } from './registerDeposit.route';
import { deleteConfig } from './deleteConfig.route';

const route = Router();

route.use(getAll);
route.use(getById);
route.use(getDeposits);
route.use(getProviderProducts);
route.use(getTransactions);
route.use(getBankAccounts);
route.use(getSales)
route.use(getConfigs);
route.use(getSalesByday);
route.use(getSalesByMonth);
route.use(getSalesByProducts);
route.use(getExternalBalance);
route.use(addConfig);
route.use(updateConfig);
route.use(update);
route.use(registerDeposit);
route.use(deleteConfig);

export const providerRoute = route;
