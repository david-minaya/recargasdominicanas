import api from '../../helpers/api';
import { getConnection } from 'typeorm';
import { createConnection } from '../../helpers/createConnection';
import { TOO_MANY_REQUESTS, WRONG_EMAIL_OR_PASSWORD } from '../../../constants/error-types';

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});

describe('login with wrong credentials', () => {

  test('invalid email', async () => {

    try {

      await api.post('/admin/login', {
        email: 'email@examplecom',
        password: process.env.OWNER_PASSWORD
      });

      throw 'test fail';

    } catch (err: any) {

      expect(err.response.status).toBe(400);
    }
  });

  test('wrong email', async () => {

    try {

      await api.post('/admin/login', {
        email: 'email@example.com',
        password: process.env.OWNER_PASSWORD
      });

      throw 'test fail';

    } catch (err: any) {

      expect(err.response.status).toBe(401);
      expect(err.response.data).toBe(WRONG_EMAIL_OR_PASSWORD);
    }
  });

  test('wrong password', async () => {

    try {

      await api.post('/admin/login', {
        email: process.env.OWNER_EMAIL,
        password: 'hello'
      });

      throw 'test fail';

    } catch (err: any) {

      expect(err.response.status).toBe(401);
      expect(err.response.data).toBe(WRONG_EMAIL_OR_PASSWORD);
    }
  });
});

describe('login with rigth credentials', () => {

  test('login', async () => {

    const res = await api.post('/admin/login', {
      email: process.env.OWNER_EMAIL,
      password: process.env.OWNER_PASSWORD
    });

    const cookie = res.headers['set-cookie'];

    api.setCookie(cookie);

    expect(cookie).not.toBeUndefined();
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await api.post('/auth/logout');
    api.clearCookie();
  });
});

describe('prevent brute force attacks', () => {

  test('block ip after 3 failed login attempts', async () => {

    try {
      
      for (let i = 0; i < 4; i++) {

        try {

          await api.post('/admin/login', {
            email: 'email@example.com',
            password: 'helloworld'
          });

        } catch(err: any) {

          if (err.response.data === TOO_MANY_REQUESTS) {
            throw err;
          }
        }
      }

      throw 'test fail';

    } catch (err: any) {
      
      expect(err.response.status).toBe(429);
      expect(err.response.data).toBe(TOO_MANY_REQUESTS);
    }
  });

  afterAll(async () => {
    await getConnection().query('DELETE FROM rlflx');
  });
});
