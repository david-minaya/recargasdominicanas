import cors from 'cors';

export default () => {
  return cors({ 
    credentials: true,
    origin: process.env.ALLOWED_DOMAINS!.replace(/\s/g, '').split(',')
  });
}
