import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { Validator, mapSchema } from '../utils/mapSchema';
import { use } from '../utils/routeBuilder';

export function validate(validator: Validator) {

  const schema = mapSchema(validator);
  const validations = checkSchema(schema);
  
  use(async (req: Request, res: Response, next: NextFunction) => {

    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  });
}
