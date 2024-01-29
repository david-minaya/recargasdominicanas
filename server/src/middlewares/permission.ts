import { Request, Response, NextFunction } from 'express';
import { Admin } from '../entities/admin.entity';
import { Business } from '../entities/business.entity';
import { use } from '../utils/routeBuilder';
import { User } from '../entities/user.entity';
import { Customer } from '../entities/customer.entity';
import { Session, SessionData } from 'express-session';

export function permission(permission: string) {

  use(async (req: Request, res: Response, next: NextFunction) => {
    
    if (await hasPermission(req.session, 'admin', permission)) {
      req.admin = await getAdmin(req.session.userId);
      return next();
    }

    if (await hasPermission(req.session, 'customer', permission)) {
      req.customer = await getCustomer(req.session.userId);
      return next();
    }

    if (await hasPermission(req.session, 'businessUser', permission)) {
      const business = await getBusiness(req.session.userId);
      if (business.businessUsers?.[0].state === 'ACTIVATED') {
        req.business = business;
        req.businessUser = business.businessUsers[0];
        return next();
      }
    }
  
    res.status(401);
    res.send('unauthenticated');
  });
}

async function hasPermission(session: Session & Partial<SessionData>, role: SessionData['role'], permission?: string) {
  if (session.role === role) {
    return undefined !== await User.createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .leftJoin('role.permissions', 'permission')
      .where('user.id = :userId')
      .andWhere('permission.permissionId = :permission')
      .setParameters({ userId: session.userId, permission })
      .getOne();
  }
}

async function getAdmin(userId?: number) {
  return Admin.createQueryBuilder('admin')
    .leftJoin('admin.user', 'user')
    .where('user.id = :userId')
    .setParameters({ userId })
    .getOneOrFail();
}

async function getCustomer(userId?: number) {
  return Customer.createQueryBuilder('customer')
    .leftJoin('customer.user', 'user')
    .where('user.id = :userId')
    .setParameters({ userId })
    .getOneOrFail();
}

async function getBusiness(userId?: number) {
  return Business.createQueryBuilder('business')
    .leftJoinAndSelect('business.businessUsers', 'businessUser')
    .leftJoin('businessUser.user', 'user')
    .where('user.id = :userId')
    .setParameters({ userId })
    .getOneOrFail();
}
