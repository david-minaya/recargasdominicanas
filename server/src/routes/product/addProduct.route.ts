import { Product } from '../../entities/product.entity';
import { file, number, option, optional, string } from '../../utils/validators';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { PRODUCT_CREATE } from '../../constants/permissions';

const validator = {
  name: string,
  type: option('Recarga', 'Paquetico', 'Factura'),
  profit: number,
  min: [number, optional],
  max: [number, optional],
  image: file
};

permission(PRODUCT_CREATE)
uploadFile('image')
validateWithFile(validator)
post('/')
export const addProduct = route(async ({ body, file }) => {
  return Product.create({
    name: body.name,
    type: body.type,
    min: body.min,
    max: body.max,
    profit: body.profit,
    image: file?.filename
  }).save();
});
