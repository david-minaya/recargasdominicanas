import { createConnection } from 'typeorm';
import { initializeApp } from 'firebase-admin/app';
import { app } from './app';

(async () => {

  initializeApp();

  await createConnection();
  
  app.listen(parseInt(process.env.PORT!), process.env.HOST!, () => { 
    console.log(`http://${process.env.HOST}:${process.env.PORT}`);
  });
})();
