import { Customer } from '../../entities/customer.entity';
import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { email, notEmpty, number, optional, params, string } from '../../utils/validators';
import { ServerError } from '../../utils/serverError';
import { CUSTOMER_CREATE } from '../../constants/permissions';
import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';

permission(CUSTOMER_CREATE)

validate({
  'id': [number, params],
  'name': [string, optional, notEmpty],
  'docNumber': [string, optional, notEmpty],
  'phone': [string, optional, notEmpty],
  'email': [email, optional],
})

patch('/:id')
export const update = route(async req => {

  const customer = await Customer.findOne(parseInt(req.params.id));

  if (!customer) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  customer.name = req.body.name;
  customer.docNumber = req.body.docNumber;
  customer.phone = req.body.phone;
  customer.email = req.body.email;

  await customer.save();
});
