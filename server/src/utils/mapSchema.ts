import { ParamSchema, Schema } from 'express-validator';

export interface Validator {
  [key: string]: ParamSchema | ParamSchema[]
}

export function mapSchema(validator: Validator) {
  
  const schema: Schema = {};

  for (const key in validator) {
    const value = validator[key];
    const values = Array.isArray(value) ? value : [value];
    schema[key] = values.reduce((a, b) => ({ ...a, ...b }));
  }

  return schema;
}
