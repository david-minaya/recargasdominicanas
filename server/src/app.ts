import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from './middlewares/cors';
import session from './middlewares/session';
import { error } from './middlewares/error';
import { timestamp } from './middlewares/timestamp';
import { authRoute } from './routes/auth/route';
import { customerRoute } from './routes/customer/route';
import { questionRoute } from './routes/question/question.route';
import { productRoute } from './routes/product/route';
import { businessRouter } from './routes/business/route';
import { adminRoute } from './routes/admin/route';
import { businessUserRoute } from './routes/businessUser/route';
import { bankRoute } from './routes/bank/route';
import { depositRoute } from './routes/deposit/route';
import { accessTokenRoute } from './routes/accessToken/route';
import { providerRoute } from './routes/provider/route';
import { providerProductRoute } from './routes/providerProduct/route';
import { bankAccountRoute } from './routes/bankAccount/route';
import { systemRoute } from './routes/system/route';
import { imagesRoute } from './routes/images/route';
import { transactionsRoute } from './routes/transactions/route';
import { appVersionRoute } from './routes/appVersion/route';
import { appReleaseRoute } from './routes/appRelease/route';
import { finances } from './routes/finances/route';

export const app = express();

app.disable('x-powered-by');

app.use(helmet({ 
  crossOriginResourcePolicy: {
    policy: process.env.CROSS_ORIGIN_RESOURCE_POLICY
  }
}));

app.use(cors());
app.set('trust proxy', 1);
app.use(session());
app.use(express.json());
app.use(timestamp())

app.use('/static', express.static('public'));
app.use('/auth', authRoute);
app.use('/customer', customerRoute);
app.use('/question', questionRoute);
app.use('/product', productRoute);
app.use('/business', businessRouter);
app.use('/business-user', businessUserRoute);
app.use('/admin', adminRoute);
app.use('/bank', bankRoute);
app.use('/deposit', depositRoute);
app.use('/access-token', accessTokenRoute);
app.use('/providers', providerRoute);
app.use('/provider-product', providerProductRoute);
app.use('/bank-account', bankAccountRoute);
app.use('/system', systemRoute);
app.use('/image', imagesRoute);
app.use('/transactions', transactionsRoute);
app.use('/app-version', appVersionRoute);
app.use('/app-release', appReleaseRoute);
app.use('/finances', finances);
app.use(error);
