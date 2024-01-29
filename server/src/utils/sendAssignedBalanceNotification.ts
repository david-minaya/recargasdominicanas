import { getMessaging } from 'firebase-admin/messaging';
import { NotificationToken } from '../entities/notificationToken.entity';

export async function sendAssignedBalanceNotification(userId: number, balance: number) {

  const notificationTokens = await NotificationToken.find({ user: { id: userId } });

  for (const notificationToken of notificationTokens) {

    getMessaging().send({
      token: notificationToken.token,
      data: {
        type: 'BALANCE',
        title: 'Balance asignado',
        balance: new Intl.NumberFormat('es-DO').format(balance) + ' RD$'
      },
      android: {
        priority: 'high',
        ttl: 300000
      }
    }).catch(err => {

      console.log('sendAssignedBalanceNotification -> token: ', notificationToken.token);
      console.log('sendAssignedBalanceNotification -> err: ', err);

      NotificationToken.delete(notificationToken);
    });
  }
}
