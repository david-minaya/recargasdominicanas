import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { BANK_ACCOUNT_UPDATE } from '../../constants/permissions';
import { BankAccount } from '../../entities/bankAccount.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { notEmpty, number, numeric, optional, params, string } from '../../utils/validators';

permission(BANK_ACCOUNT_UPDATE);

validate({
  id: [number, params],
  name: [string, optional, notEmpty],
  accountNumber: [numeric, optional]
});

patch('/:id');
export const updateBankAccount = route(async req => {

  const bankAccount = await BankAccount.findOne(parseInt(req.params.id));

  if (!bankAccount) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  bankAccount.name = req.body.name;
  bankAccount.accountNumber = req.body.accountNumber;

  await bankAccount.save();
});
