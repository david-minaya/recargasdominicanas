import { ITransaction } from '../types';

export function expired(transaction: ITransaction) {
  const date = new Date(transaction.date);
  const expirationDate = date.getTime() + (1000 * 60 * 5);
  return Date.now() > expirationDate;
}
