import { Router } from 'express';
import { businessUserLogin } from './businessUserLogin.route';
import { getBusinessUser } from './getBusinessUser.route';
import { validateToken } from './validateToken.route';
import { createPassword } from './createPassword.route';
import { addBusinessUser } from './addBusinessUser.route';
import { generateUsername } from './generateUsername.route';
import { deleteBusinessUser } from './deleteBusinessUser.route';
import { resetPassword } from './resetPassword.route';
import { updateBusinessUser } from './updateBusinessUser.route';
import { getTransactions } from './getTransactions.route';
import { sendTransaction } from './sendTransaction.route';
import { getSalesReports } from './getSalesReports.route';
import { getBusiness } from './getBusiness.route';
import { cancelTransaction } from './cancelTransactions.route';
import { getLastTopup } from './getLastTopup.route';

const route = Router();

route.use(validateToken);
route.use(generateUsername);
route.use(getBusinessUser);
route.use(getBusiness);
route.use(getTransactions);
route.use(getLastTopup);
route.use(getSalesReports);
route.use(addBusinessUser);
route.use(businessUserLogin);
route.use(createPassword);
route.use(resetPassword);
route.use(updateBusinessUser);
route.use(deleteBusinessUser);
route.use(sendTransaction);
route.use(cancelTransaction);

export const businessUserRoute = route;
