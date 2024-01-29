import api from '../../helpers/api';

describe('unauthenticate user', () => {

  test('user isn\'t login', async () => {
    const res = await api.get('/auth/is-auth');
    expect(res.data).toBeFalsy();
  });
});

describe('authenticate user', () => {

  beforeAll(async () => {

    const res = await api.post('/admin/login', {
      email: process.env.OWNER_EMAIL,
      password: process.env.OWNER_PASSWORD
    });

    api.setCookie(res.headers['set-cookie']);
  });

  test('user is login', async () => {
    const res = await api.get('/auth/is-auth');
    expect(res.data).toBeTruthy();
  });

  afterAll(async () => {
    await api.post('/auth/logout');
    api.clearCookie();
  });
});
