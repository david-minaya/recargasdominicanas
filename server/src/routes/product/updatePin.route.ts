import { PRODUCT_UPDATE } from '../../constants/permissions';
import { Product } from '../../entities/product.entity';
import { boolean, file, number, optional, string } from '../../utils/validators';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { deleteFile } from '../../utils/deleteFile';
import { Price } from '../../entities/price.entity';
import { Pin } from '../../entities/pin.entity';

const validator = {
  id: number,
  name: [string, optional],
  enabled: [boolean, optional],
  image: [file, optional],
  instructions: [string, optional],
  prices: [string, optional]
};

permission(PRODUCT_UPDATE)
uploadFile('image')
validateWithFile(validator)
patch('/pin/:id')
export const updatePin = route(async ({ params, body, file }) => {

  const id = parseInt(params.id);
  const product = await Product.findOneOrFail(id);
  const prices = JSON.parse(body.prices).sort((p1: any, p2: any) => p1.price - p2.price);

  if (!product.pin) {
    product.pin = Pin.create({});
  }

  product.name = body.name;
  product.enabled = body.enabled;
  product.pin.instructions = body.instructions;

  if (file?.filename) {
    await deleteFile(product.image)
    product.image = file.filename;
  }

  if (prices) {

    await Price.createQueryBuilder()
      .delete()
      .where('price.productId = :id', { id })
      .execute();

    const savedPrices = await Price.save(Price.create(prices));
    
    product.pin.prices = savedPrices;
    product.prices = savedPrices;
  }

  await product.save();
  await product.reload();

  return product;
});
