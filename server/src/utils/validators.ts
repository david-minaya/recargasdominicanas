import { ParamSchema } from 'express-validator';

export const string: ParamSchema = { isString: true };
export const notEmpty: ParamSchema = { notEmpty: true };
export const number: ParamSchema = { isInt: true, toInt: true };
export const numeric: ParamSchema = { isNumeric: true };
export const decimal: ParamSchema = { isDecimal: true };
export const boolean: ParamSchema = { isBoolean: true, toBoolean: true };
export const date: ParamSchema = { isISO8601: true };
export const date2: ParamSchema = { isDate: { errorMessage: 'Invalid date, valid format yyyy-mm-dd' } };
export const alphanumeric: ParamSchema = { isAlphanumeric: true };
export const json: ParamSchema = { isJSON: true };
export const email: ParamSchema = { isEmail: true };
export const optional: ParamSchema = { optional: true };
export const headers: ParamSchema = { in: 'headers' };
export const cookies: ParamSchema = { in: 'cookies' };
export const query: ParamSchema = { in: 'query' };
export const params: ParamSchema = { in: 'params' };
export const body: ParamSchema = { in: 'body' };
export const file: ParamSchema = { custom: { options: (value, meta) => meta.req.file } };
export const regex = (regex: RegExp): ParamSchema => ({ custom: { options: (value) => regex.test(value) } });
export const length = (min: number, max?: number): ParamSchema => ({ isLength: { options: { min, max } } });

export const option = (...options: string[]): ParamSchema => ({ 
  notEmpty: true, 
  isIn: { options: [options] } 
});

export const businessId: ParamSchema = {
  isInt: true,
  toInt: true,
  custom: {
    errorMessage: 'Invalid id',
    options: (value, { req }) => 
      req.business ? req.business.id === value : true
  }
}

export const password = (options: { length?: number, letters?: boolean, numbers?: boolean, symbols?: boolean }): ParamSchema => ({
  isStrongPassword: {
    errorMessage: 'Invalid password',
    options: {
      minLength: options.length,
      minSymbols: options.symbols ? 1 : 0,
      minNumbers: options.numbers ? 1 : 0,
      minLowercase: options.letters ? 1 : 0,
      minUppercase: 0,
    }
  }
})
