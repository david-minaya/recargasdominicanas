import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessApi } from '@recargas-dominicanas/core/api';
import { IBusiness } from '@recargas-dominicanas/core/types';
import { useAppSelector, useAppDispatch } from './store';

export const businessSlice = createSlice({
  name: 'business',
  initialState: [] as IBusiness[],
  reducers: {
    set(state, action: PayloadAction<IBusiness[]>) {
      return action.payload;
    }
  }
});

export function getBusiness() {
  return useAppSelector(state => state.business);
}

export function getBusinessById(id: number) {
  return useAppSelector(state => state.business.find(business => business.id === id));
}

export function useFetchBusiness() {
  const dispatch = useAppDispatch();
  return async () => {
    const business = await BusinessApi.getBusiness();
    dispatch(businessSlice.actions.set(business));
  };
}
