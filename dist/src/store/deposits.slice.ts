import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepositApi } from '@recargas-dominicanas/core/api';
import { IDeposit } from '@recargas-dominicanas/core/types';
import { useAppSelector, useAppDispatch } from './store';

export const depositsSlice = createSlice({
  name: 'deposits',
  initialState: [] as IDeposit[],
  reducers: {
    set(state, action: PayloadAction<IDeposit[]>) {
      return action.payload;
    },
    update(state, action: PayloadAction<IDeposit>) {
      const index = state.findIndex(deposit => deposit.id === action.payload.id);
      state[index] = action.payload;
    }
  }
});

export function getDeposits() {
  return useAppSelector(state => state.deposits);
}

export function getDeposit(id: number) {
  return useAppSelector(state => state.deposits.find(deposit => deposit.id === id));
}

export function useFetchDeposits() {
  const dispatch = useAppDispatch();
  return async () => {
    const deposits = await DepositApi.getDeposits();
    dispatch(depositsSlice.actions.set(deposits));
  };
}

export function useUpdateDeposit() {
  const dispatch = useAppDispatch();
  return async (deposit: IDeposit) => {
    dispatch(depositsSlice.actions.update(deposit));
  };
}
