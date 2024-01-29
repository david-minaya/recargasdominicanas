import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { adminSlice } from './admin.slice';
import { businessSlice } from './business.slice';
import { depositsSlice } from './deposits.slice';

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    business: businessSlice.reducer,
    deposits: depositsSlice.reducer
  }
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
