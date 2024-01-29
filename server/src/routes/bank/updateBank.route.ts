import { BANK_UPDATE } from '../../constants/permissions';
import { Bank } from '../../entities/bank.entity';
import { deleteFile } from '../../utils/deleteFile';
import { file, number, params, string } from '../../utils/validators';
import { permission, uploadFile, validateWithFile } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';

const schema = {
  id: [number, params],
  name: string,
  image: file
};

permission(BANK_UPDATE)
uploadFile('image')
validateWithFile(schema)
patch('/:id')
export const updateBank = route(async req => {

  const bank = await Bank.findOneOrFail(req.params.id);

  await deleteFile(bank.image);

  bank.name = req.body.name,
  bank.image = req.file!.filename

  await bank.save();

  return bank;
});
