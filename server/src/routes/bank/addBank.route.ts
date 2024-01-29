import { BANK_CREATE } from '../../constants/permissions';
import { Bank } from '../../entities/bank.entity';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { file, string } from '../../utils/validators';
import { route, post } from '../../utils/routeBuilder';

permission(BANK_CREATE)
uploadFile('image')
validateWithFile({ name: string, image: file })
post('/')
export const addBank = route(async (req) => {
  return Bank.create({
    name: req.body.name,
    image: req.file?.filename
  }).save();
});
