import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { Customer } from '../../entities/customer.entity';
import { CUSTOMER_READ } from '../../constants/permissions';

permission(CUSTOMER_READ)
get('/')
export const getAll = route(async () => {
  return Customer.find({ 
    relations: [
      'user', 
      'user.tempPassword'
    ] 
  });
});
