import { Router } from 'express';
import { download } from './download.route';

const route = Router();

route.use(download);

export const imagesRoute = route;
