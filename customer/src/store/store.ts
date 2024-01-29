import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { CustomerStore } from './customerStore';
import { BusinessStore } from './businessStore';

export const store = configureStore({
  reducer: {
    customer: CustomerStore.reducer(),
    business: BusinessStore.reducer()
  }
});

export type State = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export function resetStore() {
  CustomerStore.reset();
  BusinessStore.reset();
}
