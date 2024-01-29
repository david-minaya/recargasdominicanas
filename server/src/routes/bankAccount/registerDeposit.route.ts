import { DEPOSIT_CREATE } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission } from '../../middlewares';
import { body } from '../../middlewares/body';
import { params } from '../../middlewares/params';
import { post, status, route } from '../../utils/routeBuilder';
import { sendAssignedBalanceNotification } from '../../utils/sendAssignedBalanceNotification';
import { date, decimal, number, optional, string } from '../../utils/validators';
import { BaseRequest } from '../../interfaces/baseRequest';

interface Request extends BaseRequest {
  params: {
    id: number;
  },
  body: {
    date: string;
    balance: number;
    reference?: string;
    businessId?: number;
  }
}

permission(DEPOSIT_CREATE)
params({ id: number })
body({
  date: date,
  balance: decimal,
  reference: [string, optional],
  businessId: [number, optional]
})
status(201)
post('/:id/register-deposit')
export const registerDeposit = route(async (req: Request) => {
  
  const { 
    date,
    balance,
    reference,
    businessId
  } = req.body;

  const business = await Business.findOne({ 
    where: { id: businessId },
    relations: ['user']
  });

  const deposit = Deposit.create({
    user: business?.user,
    date: date,
    reference: reference,
    assignedBy: { id: req.admin.id },
    bankAccount: { id: req.params.id },
    balance: {
      amount: balance,
      date: date,
      user: business?.user
    }
  });

  if (business?.user) {
    sendAssignedBalanceNotification(business.user.id, balance);
  }

  return deposit.save();
});
