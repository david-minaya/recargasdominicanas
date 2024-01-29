import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { businessSlice } from './business.slice';
import { transactionsSlice } from './transactions.slice';
import { productsSlice } from './products.slice';
import { businessUserSlice } from './businessUser.slice';
import { salesReportSlice } from './salesReport.slice';

export const store = configureStore({
  reducer: {
    business: businessSlice.reducer,
    businessUser: businessUserSlice.reducer,
    transactions: transactionsSlice.reducer,
    products: productsSlice.reducer,
    salesReport: salesReportSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
