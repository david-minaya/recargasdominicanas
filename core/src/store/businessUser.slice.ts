import { useMemo } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBusinessUser } from '../types/businessUser.type';
import { BusinessUserApi } from '../api/businessUser.api';
import { useAppDispatch, useAppSelector } from './store';

export const businessUserSlice = createSlice({
  name: 'businessUser',
  initialState: {} as IBusinessUser,
  reducers: {
    set(state, action: PayloadAction<IBusinessUser>) {
      return action.payload;
    }
  }
});

export function useBusinessUsers() {

  const dispatch = useAppDispatch();

  return useMemo(() => ({

    get() {
      return useAppSelector(state => state.businessUser);
    },

    async fetch() {
      const businessUser = await BusinessUserApi.getBusinessUser();
      dispatch(businessUserSlice.actions.set(businessUser));
    }
  }), []);
}
