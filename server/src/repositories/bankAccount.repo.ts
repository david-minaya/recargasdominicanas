import { Deposit } from '../entities/deposit.entity';
import { Withdrawal } from '../entities/withdrawal.entity';
import { BankAccount } from '../entities/bankAccount.entity';

interface BankAccountBalance extends BankAccount {
  balance: number;
}

export class BankAccountRepo {

  static async getAll() {
    return this.query().getRawMany<BankAccountBalance[]>();
  }

  static async getById(id: number) {
    return this.query()
      .where('bankAccount.id = :id')
      .setParameters({ id })
      .getRawOne<BankAccountBalance>();
  }

  private static query() {
    return BankAccount.createQueryBuilder('bankAccount')
      .select('bankAccount.*')
      .addSelect('SUM(IFNULL(deposit.balance, 0) - IFNULL(withdrawal.balance, 0))', 'balance')
      .addSelect('JSON_OBJECT("image", bank.image)', 'bank')
      .leftJoin('bankAccount.bank', 'bank')
      .leftJoin(
        subquery => subquery
          .addSelect('deposit.bankAccountId')
          .addSelect('SUM(balance.amount)', 'balance')
          .from(Deposit, 'deposit')
          .leftJoin('deposit.balance', 'balance')
          .groupBy('deposit.bankAccountId'),
        'deposit', 'deposit.bankAccountId = bankAccount.id'
      )
      .leftJoin(
        subquery => subquery
          .addSelect('withdrawal.bankAccountId')
          .addSelect('SUM(balance.amount)', 'balance')
          .from(Withdrawal, 'withdrawal')
          .leftJoin('withdrawal.balance', 'balance')
          .groupBy('withdrawal.bankAccountId'),
        'withdrawal', 'withdrawal.bankAccountId = bankAccount.id'
      )
      .groupBy('bankAccount.id')
      .where('bankAccount.userId IS NULL')
  }
}