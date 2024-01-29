import { Api } from './api';

import { 
  IFinance, 
  ISaleByDay, 
  ISaleByMonth, 
  ISaleByProduct 
} from '../types/finance.type';

export class FinanceApi extends Api {

  public static async getSummary(startDate: Date, endDate: Date) {
    return this.get<IFinance>('/finances/summary', {
      params: {
        startDate, 
        endDate
      }
    });
  }

  public static async getSalesByDay(startDate: Date, endDate: Date) {
    return this.get<ISaleByDay[]>('/finances/sales-by-day', {
      params: {
        startDate, 
        endDate
      }
    });
  }

  public static async getSalesByMonth(startDate: Date, endDate: Date) {
    return this.get<ISaleByMonth[]>('/finances/sales-by-month', {
      params: {
        startDate, 
        endDate
      }
    });
  }

  public static async getSalesByProduct(startDate: Date, endDate: Date) {
    return this.get<ISaleByProduct[]>('/finances/sales-by-products', {
      params: {
        startDate, 
        endDate
      }
    });
  }
}
