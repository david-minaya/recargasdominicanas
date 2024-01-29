import api from '../../helpers/api';

describe('admin', () => {

  beforeAll(async () => {
  
    const res = await api.post('/admin/login', {
      email: process.env.OWNER_EMAIL,
      password: process.env.OWNER_PASSWORD
    });
    
    api.setCookie(res.headers['set-cookie']);
  });
  
  test('get admin', async () => {
    
    const res = await api.get('/admin');
    
    expect(res.data).toStrictEqual({ 
      id: 1,
      name: process.env.OWNER_NAME, 
      email: process.env.OWNER_EMAIL 
    });
  });
  
  afterAll(async () => {
    await api.post('/auth/logout');
    api.clearCookie();
  });
});

