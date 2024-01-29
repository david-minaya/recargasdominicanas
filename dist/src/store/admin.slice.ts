import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminApi } from '@recargas-dominicanas/core/api';
import { IAdmin } from '@recargas-dominicanas/core/types';
import { useAppSelector, useAppDispatch } from './store';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {} as IAdmin,
  reducers: {
    set(state, action: PayloadAction<IAdmin>) {
      return action.payload;
    }
  }
});

export function getAdmin() {
  return useAppSelector(state => state.admin);
}

export function useFetchAdmin() {
  const dispatch = useAppDispatch();
  return async () => {
    const admin = await AdminApi.getAdmin();
    dispatch(adminSlice.actions.set(admin));
  };
}
