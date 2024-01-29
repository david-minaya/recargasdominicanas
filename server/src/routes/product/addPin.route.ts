import { Product } from '../../entities/product.entity';
import { file, notEmpty, optional, string } from '../../utils/validators';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { PRODUCT_CREATE } from '../../constants/permissions';
import { ProductType } from '../../constants/productType';
import { Price } from '../../entities/price.entity';

const validator = {
  name: [string, notEmpty],
  image: file,
  instructions: [string, notEmpty, optional],
  prices: string
};

permission(PRODUCT_CREATE)
uploadFile('image')
validateWithFile(validator)
post('/pin')
export const addPin = route(async ({ body, file }) => {

  const prices = JSON.parse(body.prices).sort((p1: any, p2: any) => p1.price - p2.price);
  const savedPrices = await Price.save(Price.create(prices));

  return Product.create({
    type: ProductType.PIN,
    name: body.name,
    image: file?.filename,
    prices: savedPrices,
    pin: {
      instructions: body.instructions,
      prices: savedPrices
    }
  }).save();
});
