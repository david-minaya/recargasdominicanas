import { useMemo } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/product.type';
import { BusinessApi } from '../api/business.api';
import { useAppDispatch, useAppSelector } from './store';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [] as IProduct[],
  reducers: {
    set(state, action: PayloadAction<IProduct[]>) {
      return action.payload;
    }
  }
});

export function useProducts() {

  const dispatch = useAppDispatch();

  return useMemo(() => ({

    get() {
      return useAppSelector(state => state.products);
    },

    async fetch() {
      const products = await BusinessApi.getProducts();
      dispatch(productsSlice.actions.set(products));
    }
  }), []);
}
