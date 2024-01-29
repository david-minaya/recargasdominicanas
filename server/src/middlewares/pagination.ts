import { use } from '../utils/routeBuilder';
import { number, optional, query } from '../utils/validators';
import { validate } from './validate';

export function pagination() {

  validate({
    page: [query, number, optional],
    size: [query, number, optional]
  });
  
  use(async (req, res, next) => {

    const index = req.query.page ? parseInt(req.query.page as string) : 1;
    const size = req.query.size ? parseInt(req.query.size as string) : 1000;
    const skip = (index -1) * size;

    req.page = { index, size, skip };

    next();
  });
}
