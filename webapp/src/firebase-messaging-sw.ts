import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC7eigLI0OSSO97gpsbPn8DliEBWMjQXL4',
  authDomain: 'recargas-dominicanas.firebaseapp.com',
  projectId: 'recargas-dominicanas',
  storageBucket: 'recargas-dominicanas.appspot.com',
  messagingSenderId: '554293903687',
  appId: '1:554293903687:web:78fe32a30569eb8e800c62',
  measurementId: 'G-RGG4LZNK07'
});

getMessaging(firebaseApp);
