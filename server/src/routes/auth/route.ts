import { Router } from 'express';
import { logout } from './logout.route';
import { isAuth } from './isAuth.route';

const route = Router();

route.use(isAuth);
route.use(logout);

export const authRoute = route;
