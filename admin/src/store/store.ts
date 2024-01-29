import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AdminStore } from './adminStore';
import { BankAccountStore } from './bankAccountStore';
import { BankStore } from './bankStore';
import { BusinessStore } from './businessStore';
import { ProductStore } from './productStore';
import { ProviderStore } from './providerStore';
import { AppReleaseStore } from './appReleaseStore';
import { FinanceStore } from './financeStore';

export const store = configureStore({
  reducer: {
    admin: AdminStore.reducer(),
    businessState: BusinessStore.reducer(),
    productsState: ProductStore.reducer(),
    bankState: BankStore.reducer(),
    bankAccounts: BankAccountStore.reducer(),
    providersState: ProviderStore.reducer(),
    appReleaseState: AppReleaseStore.reducer(),
    finance: FinanceStore.reducer()
  }
});

export type State = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
