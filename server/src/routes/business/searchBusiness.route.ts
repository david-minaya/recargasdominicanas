import { Like } from 'typeorm';
import { permission } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { BUSINESS_READ } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';

permission(BUSINESS_READ);
get('/search')
export const searchBusiness = route(async req => {
  return Business.find({ 
    relations: ['user'],
    where: [
      { id: Like(`%${req.query.text}%`) },
      { name: Like(`%${req.query.text}%`) }
    ],
    take: 25
  });
});
