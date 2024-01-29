import session from 'express-session'
import { SessionStore } from '../utils/sessionStore'

export default () => {
  return session({
    secret: process.env.SESSION_SECRET!.replace(/\s/g, '').split(','),
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(),
    cookie: { 
      httpOnly: true,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE!),
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAME_SITE as any,
      domain: process.env.COOKIE_DOMAIN
    },
  });
}
