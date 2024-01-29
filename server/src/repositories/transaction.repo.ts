import { Business } from '../entities/business.entity';
import { BusinessUser } from '../entities/businessUser.entity';
import { Contract } from '../entities/contract.entity';
import { ProviderProduct } from '../entities/providerProduct.entity';
import { Transaction } from '../entities/transaction.entity';
import { Provider } from '../providers/provider';

interface ITransaction {
  phone?: string;
  amount: number;
  ref?: string;
  pin?: string;
  business: Business;
  businessUser: BusinessUser;
  provider: Provider;
  providerProduct: ProviderProduct;
  contract?: Contract;
}

interface SaveTransaction extends ITransaction {
  businessProfit: number;
  systemProfit: number;
}

export class TransactionRepo {

  static async save(data: ITransaction) {

    const businessProfit = (data.amount / 100) * data.business.percent;
    const systemProfit = (data.amount / 100) * (data.providerProduct.profit - data.business.percent);

    return this._save({
      ...data,
      businessProfit,
      systemProfit
    })
  }

  static async saveInvoice(invoice: ITransaction) {

    const businessProfit = invoice.providerProduct.product.profit;
    const systemProfit = invoice.providerProduct.profit - businessProfit;

    return this._save({ 
      ...invoice,
      businessProfit,
      systemProfit
    });
  }

  static async _save(data: SaveTransaction) {

    const {
      phone,
      amount,
      pin,
      ref,
      businessProfit,
      systemProfit,
      business,
      businessUser,
      provider,
      providerProduct,
      contract
    } = data;

    const transaction = Transaction.create({
      phone: phone,
      amount: amount,
      pin: pin,
      date: new Date(),
      reference: ref,
      business: business,
      businessUser: businessUser,
      provider: { id: provider.id },
      product: providerProduct.product,
      contract: contract,
      profits: [
        { 
          date: new Date(), 
          amount: businessProfit,
          user: business.user 
        },
        { 
          date: new Date(), 
          amount: systemProfit,
          user: provider.user 
        }
      ],
      balance: [
        { 
          date: new Date(),
          amount: businessProfit - amount,
          user: business.user
        },
        { 
          date: new Date(),
          amount: (businessProfit + systemProfit) - amount,
          user: provider.user
        }
      ]
    });

    const storedTransaction = await transaction.save();

    return { 
      ...storedTransaction, 
      profit: businessProfit 
    };
  }
}
