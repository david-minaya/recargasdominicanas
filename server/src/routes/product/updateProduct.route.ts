import { PRODUCT_UPDATE } from '../../constants/permissions';
import { Product } from '../../entities/product.entity';
import { boolean, file, number, option, optional, string } from '../../utils/validators';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { deleteFile } from '../../utils/deleteFile';

const validator = {
  id: number,
  name: [string, optional],
  type: [option('Recarga', 'Paquetico', 'Factura'), optional],
  min: [number, optional],
  max: [number, optional],
  profit: [number, optional],
  enabled: [boolean, optional],
  image: [file, optional]
};

permission(PRODUCT_UPDATE)
uploadFile('image')
validateWithFile(validator)
patch('/:id')
export const updateProduct = route(async ({ params, body, file }) => {

  const product = await Product.findOneOrFail(params.id);

  product.name = body.name;
  product.type = body.type;
  product.min = body.min;
  product.max = body.max;
  product.profit = body.profit;
  product.enabled = body.enabled;

  if (file?.filename) {
    await deleteFile(product.image)
    product.image = file.filename;
  }

  await product.save();
  await product.reload();

  return product;
});
