import { DEPOSIT_UPDATE } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Deposit } from '../../entities/deposit.entity';
import { permission, validate } from '../../middlewares';
import { sendAssignedBalanceNotification } from '../../utils/sendAssignedBalanceNotification';
import { post, route } from '../../utils/routeBuilder';
import { number } from '../../utils/validators';

permission(DEPOSIT_UPDATE)
validate({ id: number, businessId: number })
post('/:id/assign')
export const assignDeposit = route(async req => {

  const deposit = await Deposit.findOneOrFail(req.params.id, { relations: ['balance'] });
  const business = await Business.findOneOrFail(req.body.businessId, { relations: ['user'] });
  
  deposit.user = business.user;
  deposit.balance.user = business.user;
  
  await deposit.save();

  sendAssignedBalanceNotification(deposit.user.id, deposit.balance.amount);
});
