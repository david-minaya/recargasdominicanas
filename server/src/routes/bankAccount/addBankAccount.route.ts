import { BANK_ACCOUNT_CREATE } from '../../constants/permissions';
import { BankAccount } from '../../entities/bankAccount.entity';
import { permission, validate } from '../../middlewares';
import { post, route } from '../../utils/routeBuilder';
import { number, optional, string } from '../../utils/validators';

permission(BANK_ACCOUNT_CREATE)

validate({
  name: string,
  accountNumber: number,
  bankId: number,
  userId: [number, optional]
})

post('/')
export const addBankAccount = route(async ({ body }) => {
  return BankAccount.create({
    name: body.name,
    accountNumber: body.accountNumber,
    bank: { id: body.bankId },
    user: body.userId ? { id: body.userId } : undefined
  }).save();
});
