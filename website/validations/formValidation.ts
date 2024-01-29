import { IFormData } from '../types';
import { regexps } from '../constants';

const { empty, id, phone, email } = regexps;

export function formValidation(formData: IFormData) {
  return empty.test(formData.name)
    && empty.test(formData.businessName) 
    && id.test(formData.id) 
    && phone.test(formData.phone)
    && email.test(formData.email)
    && empty.test(formData.city) 
    && empty.test(formData.address);
}
