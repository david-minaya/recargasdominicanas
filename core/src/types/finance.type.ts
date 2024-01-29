export interface IFinance {
  balance: number;
  balanceAsigned: number;
  banksBalance: number;
  generalProfit: number;
  capital: number;
  sales: number;
  profit: number;
}

export interface ISaleByDay {
  date: string;
  sales: number;
  profit: number;
}

export interface ISaleByMonth {
  date: string;
  sales: number;
  profit: number;
  name: string;
}

export interface ISaleByProduct {
  id: number;
  name: string; 
  type: string; 
  total: number;
}
