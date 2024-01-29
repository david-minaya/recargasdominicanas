import { Router } from 'express';
import { getProducts } from './getProducts.route';
import { addProduct } from './addProduct.route';
import { updateProduct } from './updateProduct.route';
import { addPin } from './addPin.route';
import { updatePin } from './updatePin.route';

const route = Router();

route.use(getProducts);
route.use(addProduct);
route.use(addPin);
route.use(updateProduct);
route.use(updatePin);

export const productRoute = route;
