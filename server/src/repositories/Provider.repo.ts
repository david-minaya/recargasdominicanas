import { SelectQueryBuilder } from 'typeorm';
import { Provider } from '../entities/provider.entity';
import { ProviderProduct } from '../entities/providerProduct.entity';
import { Transaction } from '../entities/transaction.entity';
import { Profit } from '../entities/profit.entity';

export class ProviderRepo {

  static async getOne(id: number) {

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth());
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1);

    return Provider.createQueryBuilder('provider')
      .select('provider.*')
      .addSelect('JSON_OBJECT("id", provider.userId)', 'user')
      .addSelect(this.balance(), 'balance')
      .addSelect(this.sales(startDate, endDate), 'sales')
      .addSelect(this.profit(startDate, endDate), 'profit')
      .where('provider.id = :id', { id })
      .getRawOne();
  }

  static async getAll() {

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth());
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1);

    const rawAndEntities = await Provider.createQueryBuilder('provider')
      .addSelect(this.balance(), 'balance')
      .addSelect(this.sales(startDate, endDate), 'sales')
      .addSelect(this.profit(startDate, endDate), 'profit')
      .leftJoinAndSelect('provider.user', 'user')
      .getRawAndEntities();

    return rawAndEntities.raw.map((raw, index) => ({
      balance: raw.balance,
      sales: raw.sales,
      profit: raw.profit,
      ...rawAndEntities.entities[index]
    }));
  }

  static async getProduct(productId: number, balance = 0) {
    return ProviderProduct.createQueryBuilder('providerProduct')
      .leftJoinAndSelect('providerProduct.product', 'product')
      .leftJoinAndSelect('product.pin', 'pin')
      .leftJoinAndSelect('providerProduct.provider', 'provider')
      .leftJoin(
        subQuery => subQuery
          .select('provider.id', 'providerId')
          .addSelect(this.balance(), 'balance')
          .from(Provider, 'provider'), 
        'providerBalance', 'providerBalance.providerId = provider.id'
      )
      .where('product.id = :productId')
      .andWhere('provider.enabled = true')
      .andWhere('providerProduct.enabled = true')
      .andWhere('providerBalance.balance > :balance')
      .setParameters({ productId, balance })
      .getOneOrFail();
  }

  static getSales(id: number, startDate: Date, endDate: Date) {
    return Provider.createQueryBuilder('provider')
      .select(this.balance(), 'balance')
      .addSelect(this.sales(startDate, endDate), 'sales')
      .addSelect(this.profit(startDate, endDate), 'profit')
      .where('provider.id = :id', { id })
      .getRawOne();
  }

  private static balance() {
    return (subquery: SelectQueryBuilder<any>) => 
      subquery
        .select('IFNULL(SUM(balance.amount), 0)', 'total')
        .from(Provider, 'prov')
        .leftJoin('prov.user', 'user')
        .leftJoin('user.balances', 'balance')
        .leftJoin('balance.transaction', 'transaction')
        .where('prov.id = provider.id')
        .andWhere('(transaction.cancelled = false OR transaction.id IS NULL)');
  }
  
  private static sales(startDate: Date, endDate: Date) {
    return (subquery: SelectQueryBuilder<any>) => 
      subquery
        .addSelect('IFNULL(SUM(transaction.amount), 0)')
        .from(Transaction, 'transaction')
        .where('transaction.providerId = provider.id')
        .andWhere('transaction.cancelled = false')
        .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
        .setParameters({ startDate, endDate });
  }
  
  private static profit(startDate: Date, endDate: Date) {
    return (subquery: SelectQueryBuilder<any>) => 
      subquery
        .addSelect('IFNULL(SUM(profit.amount), 0)')
        .from(Profit, 'profit')
        .leftJoin('profit.transaction', 'transaction')
        .where('profit.userId = provider.userId')
        .andWhere('transaction.cancelled = false')
        .andWhere('transaction.date >= :startDate AND transaction.date < :endDate')
        .setParameters({ startDate, endDate });
  }
}
