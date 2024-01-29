import Mail from 'nodemailer/lib/mailer';
import { Admin } from './src/entities/admin.entity';
import { Business } from './src/entities/business.entity';
import { BusinessUser } from './src/entities/businessUser.entity';
import { Page } from './src/interfaces/page';
import { Customer } from './src/entities/customer.entity';

declare global {
  namespace Express {
    export interface Response {
      transporter: Mail
    }
    export interface Request {
      admin: Admin;
      customer: Customer;
      business: Business;
      businessUser: BusinessUser;
      page: Page;
      date: Date;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId: number;
    role: 'admin' | 'customer' | 'businessUser';
  }
}
