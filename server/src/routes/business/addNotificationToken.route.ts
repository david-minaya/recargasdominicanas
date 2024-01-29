import { User } from '../../entities/user.entity';
import { NotificationToken } from '../../entities/notificationToken.entity';
import { post, route } from '../../utils/routeBuilder';
import { permission, validate } from '../../middlewares';
import { notEmpty, string } from '../../utils/validators';
import { NOTIFICATION_TOKEN_ADD } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';

permission(NOTIFICATION_TOKEN_ADD)
validate({ token: [string, notEmpty] })
post('/notification-token')
export const addNotificationToken = route(async req => {

  const user = await User.createQueryBuilder('user')
    .leftJoin(Business, 'business', 'business.userId = user.id')
    .where('business.id = :id', { id: req.business.id })
    .getOneOrFail();

  const notificationToken = await NotificationToken.findOne({ 
    token: req.body.token 
  });

  if (notificationToken) {

    notificationToken.date = new Date();

    await notificationToken.save();

  } else {

    const newNotificationToken = NotificationToken.create({
      token: req.body.token,
      date: new Date(),
      user: user
    });
  
    await newNotificationToken.save();
  }
});
