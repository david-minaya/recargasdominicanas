import nodemailer from 'nodemailer';

export function configureTransporter() {

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  });

  return (req: any, res: any, next: any) => {
    res.transporter = transporter;
    next();
  };
}
