import { useMemo } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransactionGroups } from '../types/transactionGroups.type';
import { BusinessUserApi } from '../api/businessUser.api';
import { useAppDispatch, useAppSelector } from './store';
import { ITransaction, IPage } from '../types';

const slice = createSlice({
  name: 'transactions',
  initialState: {
    groupByDay: {
      index: 0,
      loading: true,
      successful: false,
      error: false,
      groups: [] as ITransactionGroups[],
    },
    page: {
      loading: true,
      successful: false,
      error: false,
      index: 0,
      size: 0,
      pages: 0,
      count: 0,
      transactions: [] as ITransaction[]
    },
  },
  reducers: {
    setGroupByDayLoading(state) {
      state.groupByDay.loading = true;
      state.groupByDay.successful = false;
      state.groupByDay.error = false;
    },
    setGroupByDayError(state) {
      state.groupByDay.loading = false;
      state.groupByDay.successful = false;
      state.groupByDay.error = true;
    },
    setGroupByDay(state, action: PayloadAction<IPage<ITransactionGroups>>) {
      state.groupByDay.index = action.payload.page;
      state.groupByDay.loading = false;
      state.groupByDay.successful = true;
      state.groupByDay.error = false;
      state.groupByDay.groups = action.payload.data;
    },
    addGroup(state, action: PayloadAction<IPage<ITransactionGroups>>) {

      state.groupByDay.index = action.payload.page;
      state.groupByDay.loading = false;
      state.groupByDay.successful = true;
      state.groupByDay.error = false;

      for (const group of action.payload.data) {

        const groupExists = state.groupByDay.groups.find(({ date }) => date === group.date);

        if (groupExists) {
          groupExists.transactions.push(...group.transactions);
        } else {
          state.groupByDay.groups.push(group);
        }
      }
    },
    setPage(state, action: PayloadAction<IPage<ITransactionGroups>>) {
      state.page = {
        loading: false,
        successful: true,
        error: false,
        index: action.payload.page,
        size: action.payload.size,
        pages: action.payload.pages,
        count: action.payload.total,
        transactions: action.payload.data.reduce<ITransaction[]>((list, item) => 
          [...list, ...item.transactions], 
        []),
      };
    },
    setPageLoading(state) {
      state.page.loading = true;
      state.page.successful = false;
      state.page.error = false;
    },
    setPageError(state, action: PayloadAction<{ index: number, size: number }>) {
      state.page.loading = false;
      state.page.successful = false;
      state.page.error = true;
      state.page.index = action.payload.index;
      state.page.size = action.payload.size;
      state.page.transactions = [];
    }
  }
});

export function useTransactions() {

  const dispatch = useAppDispatch();

  return useMemo(() => ({

    get(id: number) {
      return useAppSelector(state => {
        for (const { transactions } of state.transactions.groupByDay.groups) {
          for (const transaction of transactions) {
            if (transaction.id === id) {
              return transaction;
            }
          }
        }
      });
    },

    getGroupByDay() {
      return useAppSelector(state => state.transactions.groupByDay);
    },

    getPage() {
      return useAppSelector(state => state.transactions.page);
    },

    async fetchGroupByDay(index: number, size: number) {

      try {

        dispatch(slice.actions.setGroupByDayLoading());

        const page = await BusinessUserApi.getTransactions(index, size);

        if (index === 1) {
          dispatch(slice.actions.setGroupByDay(page));
        } else {
          dispatch(slice.actions.addGroup(page));
        }

      } catch {

        dispatch(slice.actions.setGroupByDayError());
      }
    },

    async fetchPage(index: number, size: number) {

      try {

        dispatch(slice.actions.setPageLoading());
        const page = await BusinessUserApi.getTransactions(index, size);
        dispatch(slice.actions.setPage(page));

      } catch {

        dispatch(slice.actions.setPageError({ index, size }));
      }
    }
  }), []);
}

export const transactionsSlice = slice;
