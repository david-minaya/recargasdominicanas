import { IFinance, ISaleByProduct } from '@recargas-dominicanas/core/types';
import { FinanceApi } from '@recargas-dominicanas/core/api';
import { BaseStore } from './BaseStore';

interface State {
  id: 1;
  summary: IFinance;
  sales: { value: number, date: string }[];
  profits: { value: number, date: string }[];
  xTickCount: number;
  barWidth: number;
  timeFormat: 'day' | 'week' | 'month';
  salesByProduct: ISaleByProduct[];
}

export class Store extends BaseStore<State> {
  
  constructor() {
    super('finance', [
      {
        id: 1,
        sales: [],
        profits: [],
        salesByProduct: [],
        xTickCount: 15,
        barWidth: 8,
        timeFormat: 'day'
      }
    ]);
  }

  getSummary(): IFinance | undefined {
    return this.findById(1, 'summary');
  }

  getSales() {
    return this.findById(1, 'sales');
  }

  getProfits() {
    return this.findById(1, 'profits');
  }

  getSalesByProduct() {
    return this.findById(1, 'salesByProduct');
  }

  getTickCount() {
    return this.findById(1, 'xTickCount');
  }

  getTimeFormat() {
    return this.findById(1, 'timeFormat');
  }

  getBarWidth() {
    return this.findById(1, 'barWidth');
  }

  async fetch() {

    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth());
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1);

    this.fetchSummary(startDate, endDate);
    this.fetchSalesByDay(startDate, endDate);
    this.fetchSalesByProduct(startDate, endDate);
  }

  async fetchSummary(startDate: Date, endDate: Date) {
    this.update(1, 'summary', await FinanceApi.getSummary(startDate, endDate));
  }

  async fetchSalesByDay(startDate: Date, endDate: Date) {
    const sales = await FinanceApi.getSalesByDay(startDate, endDate);
    this.update(1, 'sales', sales.map(sales => ({ value: sales.sales, date: sales.date })));
    this.update(1, 'profits', sales.map(sales => ({ value: sales.profit, date: sales.date })));
    this.update(1, 'timeFormat', 'day');
    this.update(1, 'xTickCount', 15);
    this.update(1, 'barWidth', 8);
  }

  async fetchSalesByMonth(startDate: Date, endDate: Date) {
    const sales = await FinanceApi.getSalesByMonth(startDate, endDate);
    this.update(1, 'sales', sales.map(sales => ({ value: sales.sales, date: sales.date })));
    this.update(1, 'profits', sales.map(sales => ({ value: sales.profit, date: sales.date })));
    this.update(1, 'timeFormat', 'month');
    this.update(1, 'xTickCount', 12);
    this.update(1, 'barWidth', 16);
  }

  async fetchSalesByProduct(startDate: Date, endDate: Date) {
    this.update(1, 'salesByProduct', await FinanceApi.getSalesByProduct(startDate, endDate));
  }
}

export const FinanceStore = new Store();
