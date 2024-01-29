import { Validator } from '../utils/mapSchema';
import { validate } from './validate';
import { query as queryValidator } from '../utils/validators';

export function query(validator: Validator) {

  for (const key in validator) {
    const value = validator[key];
    const values = Array.isArray(value) ? value : [value];
    validator[key] = [...values, queryValidator];
  }

  validate(validator);
}
