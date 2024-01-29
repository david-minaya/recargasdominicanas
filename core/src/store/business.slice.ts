import { useMemo } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBusiness } from '../types/business.type';
import { BusinessUserApi } from '../api/businessUser.api';
import { useAppDispatch, useAppSelector } from './store';

export const businessSlice = createSlice({
  name: 'business',
  initialState: {} as IBusiness,
  reducers: {
    set(state, action: PayloadAction<IBusiness>) {
      return action.payload;
    }
  }
});

export function useBusiness() {

  const dispatch = useAppDispatch();

  return useMemo(() => ({

    get() {
      return useAppSelector(state => state.business);
    },

    async fetch() {
      const business = await BusinessUserApi.getBusiness();
      dispatch(businessSlice.actions.set(business));
    }
  }), []);
}
