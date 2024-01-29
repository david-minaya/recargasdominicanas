import { INSUFFICIENT_FUNDS, NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { BANK_ACCOUNT_TRANSFER } from '../../constants/permissions';
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
    destinationBankAccountId: number;
    balance: number;
    date: string;
    description?: string;
    taxes?: number;
    brcd?: number;
  }
}

const bodyValidator = {
  destinationBankAccountId: number,
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
post('/:id/register-transfer')
export const registerTransfer = route(async (req: Request) => {
  
  const {
    destinationBankAccountId,
    balance,
    date,
    description,
    taxes = 0,
    brcd = 0
  } = req.body;

  const sourceBankAccount = await BankAccountRepo.getById(req.params.id);
  const destinationBankAccount = await BankAccountRepo.getById(destinationBankAccountId);

  if (!sourceBankAccount || !destinationBankAccount) {
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
      balance: {
        date: date,
        amount: balance
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
