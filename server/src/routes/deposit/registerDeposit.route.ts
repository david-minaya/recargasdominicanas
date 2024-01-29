import { DEPOSIT_CREATE } from '../../constants/permissions';
import { Deposit } from '../../entities/deposit.entity';
import { permission, validate } from '../../middlewares';
import { post, status, route } from '../../utils/routeBuilder';
import { sendAssignedBalanceNotification } from '../../utils/sendAssignedBalanceNotification';
import { date, decimal, number, optional, string } from '../../utils/validators';

const validator = {
  date: date,
  balance: decimal,
  reference: [string, optional],
  bankAccountId: number,
  userId: [number, optional],
}

permission(DEPOSIT_CREATE)
validate(validator)
status(201)
post('/')
export const registerDeposit = route(async req => {
  
  const { 
    date,
    balance,
    reference,
    bankAccountId,
    userId
  } = req.body;

  const user = userId ? { id: userId } : undefined;

  const deposit = Deposit.create({
    user: user,
    date: date,
    reference: reference,
    assignedBy: { id: req.admin.id },
    bankAccount: { id: bankAccountId },
    balance: {
      amount: balance,
      date: date,
      user: user
    }
  });

  if (userId) {
    sendAssignedBalanceNotification(userId, balance);
  }

  return deposit.save();
});
