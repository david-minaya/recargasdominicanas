import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { Customer } from './entities/customer.entity';

const {
  HOST = 'localhost',
  PORT = '3002'
} = process.env;

const app = express();
createConnection();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/balance', async (req, res) => {
  const customer = await Customer.findOne();
  res.send(customer?.balance.toString())
});

app.post('/transaction', async (req, res) => {

  const { phone: _phone, amount, company } = req.body;

  console.log(_phone);

  const phone = await Phone.findOne({ phone: _phone });

  console.log(phone);

  if (!phone) {
    res.status(400);
    res.send('INVALID_PHONE');
    return;
  }

  if (phone.company !== company) {
    res.status(400);
    res.send('WRONG_COMPANY');
    return;
  }

  const customer = await Customer.findOne();
  customer!.balance = customer!.balance - amount;
  await customer?.save();

  res.json({ reference: 'ASKJOF56EWE' });
})

app.listen(parseInt(PORT), HOST, () => { 
  console.log(`http://${HOST}:${PORT}`);
});
