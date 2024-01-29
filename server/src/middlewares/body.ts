import { Validator } from '../utils/mapSchema';
import { validate } from './validate';
import { body as bodyValidator } from '../utils/validators';

export function body(validator: Validator) {

  for (const key in validator) {
    const value = validator[key];
    const values = Array.isArray(value) ? value : [value];
    validator[key] = [...values, bodyValidator];
  }

  validate(validator);
}
