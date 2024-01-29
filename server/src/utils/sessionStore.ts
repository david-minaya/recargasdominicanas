import { SessionData, Store } from 'express-session';
import { Session } from '../entities/session.entity';

export class SessionStore extends Store {

  async get(id: string, callback: (err: any, session?: SessionData) => void) {
    try {
      const session = await Session.findOne(id);
      callback(undefined, session?.data);
    } catch (err) {
      callback(err);
    }
  }

  async set(id: string, data: SessionData, callback: (err?: any) => void) {
    try {
      const session = Session.create({ id, data });
      await session.save();
      callback();
    } catch (err) {
      callback(err);
    }
  }

  async destroy(id: string, callback: (err?: any) => void) {
    try {
      await Session.delete({ id });
      callback();
    } catch (err) {
      callback(err);
    }
  }
}
