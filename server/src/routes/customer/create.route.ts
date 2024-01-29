import crypto from 'crypto';
import { Customer } from '../../entities/customer.entity';
import { User } from '../../entities/user.entity';
import { ServerError } from '../../utils/serverError';
import { generateUserName } from '../../utils/generateUserName';
import { permission, validate } from '../../middlewares';
import { post, route, status } from '../../utils/routeBuilder';
import { decimal, email, optional, string } from '../../utils/validators';
import { Business } from '../../entities/business.entity';
import { BusinessUser } from '../../entities/businessUser.entity';
import { CUSTOMER_CREATE } from '../../constants/permissions';
import { BUSINESS_USER, CUSTOMER } from '../../constants/roles';

import { 
  BUSINESS_ALREADY_EXISTS, 
  CUSTOMER_ALREADY_EXISTS, 
  EMAIL_ALREADY_EXISTS 
} from '../../constants/error-types';

permission(CUSTOMER_CREATE)

validate({
  'customer.name': string,
  'customer.docNumber': string,
  'customer.phone': string,
  'customer.email': [email, optional],
  'business.name': string,
  'business.rnc': [string, optional],
  'business.phone': string,
  'business.email': [email, optional],
  'business.city': string,
  'business.address': string,
  'business.percent': decimal
})

status(201)
post('/')
export const create = route(async ({ body }) => {
  
  if (await Customer.findOne({ docNumber: body.customer.docNumber })) {
    throw new ServerError(409, CUSTOMER_ALREADY_EXISTS)
  }

  if (await Customer.findOne({ email: body.customer.email })) {
    throw new ServerError(409, EMAIL_ALREADY_EXISTS)
  }

  if (await Business.findOne({ rnc: body.business.rnc })) {
    throw new ServerError(409, BUSINESS_ALREADY_EXISTS)
  }

  const customer = await Customer.save(Customer.create({
    name: body.customer.name,
    docNumber: body.customer.docNumber,
    phone: body.customer.phone,
    email: body.customer.email,
    user: {
      role: { 
        id: CUSTOMER 
      }
    }
  }));

  const business = await Business.save(Business.create({
    name: body.business.name,
    rnc: body.business.rnc,
    phone: body.business.phone,
    email: body.business.email,
    city: body.business.city,
    address: body.business.address,
    percent: body.business.percent,
    user: new User(),
    customer: customer
  }));

  const businessUser = await BusinessUser.save(BusinessUser.create({
    name: customer.name,
    userName: generateUserName(business.name, business.id, 0),
    business: business,
    user: {
      role: { id: BUSINESS_USER },
      accessToken: {
        token: crypto.randomBytes(48).toString('hex'),
        expirationDate: new Date(Date.now() + 1000 * 60 * 60)
      }
    }
  }));

  return {
    customer,
    business,
    businessUser,
    token: businessUser.user.accessToken?.token
  };
});
