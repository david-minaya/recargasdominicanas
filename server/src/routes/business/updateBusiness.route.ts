import { permission, validate } from '../../middlewares';
import { patch, route } from '../../utils/routeBuilder';
import { decimal, email, notEmpty, number, optional, string } from '../../utils/validators';
import { ServerError } from '../../utils/serverError';
import { BUSINESS_UPDATE } from '../../constants/permissions';
import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { Business } from '../../entities/business.entity';

permission(BUSINESS_UPDATE)

validate({
  'id': [number],
  'name': [string, optional, notEmpty],
  'rnc': [string, optional, notEmpty],
  'phone': [string, optional, notEmpty],
  'email': [email, optional, notEmpty],
  'city': [string, optional, notEmpty],
  'address': [string, optional, notEmpty],
  'percent': [decimal, optional]
})

patch('/:id')
export const updateBusiness = route(async req => {

  const business = await Business.findOne(parseInt(req.params.id));

  if (!business) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  business.name = req.body.name;
  business.rnc = req.body.rnc;
  business.phone = req.body.phone;
  business.email = req.body.email;
  business.city = req.body.city;
  business.address = req.body.address;
  business.percent = req.body.percent;

  await business.save();
});
