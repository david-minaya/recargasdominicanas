import { Capacitor, registerPlugin } from '@capacitor/core';

interface IPushNotification {
  getCurrentToken(): Promise<{ value: string }>;
  addListener(name: string, cb: (event: any) => void): void;
}

const plugin = registerPlugin<IPushNotification>('PushNotification');

export class PushNotification {

  static onNewToken(cb: (event: { token: string }) => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('newToken', cb); 
    }
  }

  static onNewNotification(cb: () => void) {
    if (Capacitor.isNativePlatform()) {
      plugin.addListener('newNotification', cb); 
    }
  }

  static async getCurrentToken() {
    const token = await plugin.getCurrentToken();
    return token.value;
  }
}
