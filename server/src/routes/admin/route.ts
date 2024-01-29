import { Router } from 'express';
import { adminLogin } from './adminLogin.route';
import { getAdmin } from './getAdmin.route';

const router = Router();

router.use(getAdmin);
router.use(adminLogin);

export const adminRoute = router;
