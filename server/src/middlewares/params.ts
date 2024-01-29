import { Validator } from '../utils/mapSchema';
import { validate } from './validate';
import { params as paramsValidator } from '../utils/validators';

export function params(validator: Validator) {

  for (const key in validator) {
    const value = validator[key];
    const values = Array.isArray(value) ? value : [value];
    validator[key] = [...values, paramsValidator];
  }

  validate(validator);
}
