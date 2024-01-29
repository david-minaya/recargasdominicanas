import { INSUFFICIENT_FUNDS, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { BANK_ACCOUNT_TRANSFER } from '../../constants/permissions';
import { Provider } from '../../entities/provider.entity';
import { Transfer } from '../../entities/transfer.entity';
import { BaseRequest } from '../../interfaces/baseRequest';
import { permission } from '../../middlewares';
import { body } from '../../middlewares/body';
import { params } from '../../middlewares/params';
import { BankAccountRepo } from '../../repositories/bankAccount.repo';
import { post, status, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { date, decimal, number, optional, string } from '../../utils/validators';

interface Request extends BaseRequest {
  params: {
    id: number;
  },
  body: {
    providerId: number;
    bankAccountId: number;
    balance: number;
    date: string;
    description?: string;
    taxes?: number;
    brcd?: number;
  }
}

const bodyValidator = {
  providerId: number,
  bankAccountId: number,
  balance: decimal,
  date: date,
  description: [string, optional],
  taxes: [decimal, optional],
  brcd: [decimal, optional]
}

permission(BANK_ACCOUNT_TRANSFER)
params({ id: number })
body(bodyValidator)
status(201)
post('/:id/register-balance-purchase')
export const registerBalancePurchase = route(async (req: Request) => {
  
  const {
    providerId,
    bankAccountId,
    balance,
    date,
    description,
    taxes = 0,
    brcd = 0
  } = req.body;

  const sourceBankAccount = await BankAccountRepo.getById(req.params.id);
  const destinationBankAccount = await BankAccountRepo.getById(bankAccountId);
  const provider = await Provider.findOne(providerId);

  if (!sourceBankAccount || !destinationBankAccount || !provider) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  if (sourceBankAccount.balance < balance + taxes + brcd) {
    throw new ServerError(400, INSUFFICIENT_FUNDS);
  }

  await Transfer.save(Transfer.create({
    withdrawal: {
      date: date,
      description: description || '',
      bankAccount: sourceBankAccount,
      balance: {
        date: date,
        amount: balance
      }
    },
    deposit: {
      date: date,
      reference: description,
      bankAccount: destinationBankAccount,
      user: provider.user,
      balance: {
        date: date,
        amount: balance,
        user: provider.user
      }
    },
    taxes: !taxes ? undefined : {
      withdrawal: {
        date: date,
        description: `Impuestos por transferencia bancaria, monto ${balance}`,
        bankAccount: sourceBankAccount,
        balance: {
          date: date,
          amount: taxes
        }
      }
    },
    brcd: !brcd ? undefined : {
      withdrawal: {
        date: date,
        description: `Cargos por transferencia al instante, monto ${balance}`,
        bankAccount: sourceBankAccount,
        balance: {
          date: date,
          amount: brcd
        }
      }
    }
  }));
});
