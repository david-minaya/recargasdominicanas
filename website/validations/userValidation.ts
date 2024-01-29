import { IUser } from '../types';
import { regexps } from '../constants';

const { empty, phone, email } = regexps;

export function userValidation(user: IUser) {
  return empty.test(user.name)
    && phone.test(user.phone)
    && email.test(user.email);
}
