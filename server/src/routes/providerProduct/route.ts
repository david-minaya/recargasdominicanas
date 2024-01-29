import { Router } from 'express';
import { addProviderProduct } from './addProviderProduct.route';
import { deleteProviderProduct } from './deleteProviderProduct.route';
import { updateProviderProduct } from './updateProviderProduct.route';

const route = Router();

route.use(addProviderProduct);
route.use(updateProviderProduct);
route.use(deleteProviderProduct);

export const providerProductRoute = route;
