import { CapacitorConfig } from '@capacitor/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CapacitorConfig = {
  appId: 'com.recargasdominicanas.app',
  appName: 'Recargas Dominicanas',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  server: {
    androidScheme: process.env.CAPACITOR_SCHEME,
    hostname: process.env.CAPACITOR_HOSTNAME,
    url: process.env.CAPACITOR_URL,
    cleartext: process.env?.CAPACITOR_CLEAR_TEXT === 'true'
  }
};

export default config;
