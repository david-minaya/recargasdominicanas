import api from '../../helpers/api';

describe('logout', () => {

  beforeAll(async () => {
  
    const res = await api.post('/admin/login', {
      email: process.env.OWNER_EMAIL,
      password: process.env.OWNER_PASSWORD
    });
  
    api.setCookie(res.headers['set-cookie']);
  });
  
  test('logout', async () => {
    const logout = await api.post('/auth/logout');
    const isAuth = await api.get('/auth/is-auth');
    expect(logout.status).toBe(200);
    expect(isAuth.data).toBeFalsy();
  });
  
  afterAll(() => {
    api.clearCookie();
  });
})
