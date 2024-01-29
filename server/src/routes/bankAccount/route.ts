import { Router } from 'express';
import { getById } from './getById.route';
import { getAll } from './getAll.route';
import { getDeposits } from './getDeposits.route';
import { getWithdrawals } from './getWithdrawal.route';
import { addBankAccount } from './addBankAccount.route';
import { updateBankAccount } from './updateBankAccount.route';
import { registerDeposit } from './registerDeposit.route';
import { registerWithdrawal } from './registerWithdrawal.route';
import { registerTransfer } from './registerTransfer.route';
import { registerBalancePurchase } from './registerBalancePurchase.route';
import { registerProfitWithdrawal } from './registerProfitWithdrawal.route';

const route = Router();

route.use(getAll);
route.use(getById);
route.use(getDeposits);
route.use(getWithdrawals);
route.use(addBankAccount);
route.use(updateBankAccount);
route.use(registerDeposit);
route.use(registerTransfer);
route.use(registerBalancePurchase);
route.use(registerWithdrawal);
route.use(registerProfitWithdrawal);

export const bankAccountRoute = route;
