import { Router } from 'express';
import { getBusiness } from './getBusiness.route';
import { getBusinessById } from './getBusinessById.route';
import { searchBusiness } from './searchBusiness.route';
import { getDeposits } from './getDeposits.route';
import { getBusinessUsers } from './getBusinessUsers.route';
import { getProducts } from './getProducts.route';
import { getCurrentSalesReport } from './getCurrentSalesReport.route';
import { getTransactions } from './getTransactions.route';
import { createSalesReport } from './createSalesReport.route';
import { getSalesReports } from './getSalesReports.route';
import { updateBusiness } from './updateBusiness.route';
import { addNotificationToken } from './addNotificationToken.route';

const router = Router();

router.use(searchBusiness);
router.use(getSalesReports);
router.use(getDeposits);
router.use(getBusinessUsers);
router.use(getProducts);
router.use(getBusinessById);
router.use(getBusiness);
router.use(getCurrentSalesReport);
router.use(getTransactions);
router.use(createSalesReport);
router.use(updateBusiness);
router.use(addNotificationToken);

export const businessRouter = router;
