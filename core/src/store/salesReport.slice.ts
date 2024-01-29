import { useMemo } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISalesReport } from '../types/salesReport.type';
import { BusinessApi } from '../api/business.api';
import { BusinessUserApi } from '../api/businessUser.api';
import { useAppDispatch, useAppSelector } from './store';
import { IPage } from '../types';

export const salesReportSlice = createSlice({
  name: 'salesReport',
  initialState: {
    current: {} as ISalesReport,
    page: {
      loading: true,
      successful: false,
      error: false,
      index: 0,
      pages: 0,
      size: 0,
      count: 0,
      salesReport: [] as ISalesReport[]
    }
  },
  reducers: {
    setCurrent(state, action: PayloadAction<ISalesReport>) {
      state.current = action.payload;
    },
    setPage(state, action: PayloadAction<IPage<ISalesReport>>) {
      state.page = {
        loading: false,
        successful: true,
        error: false,
        index: action.payload.index,
        pages: action.payload.pages,
        size: action.payload.size,
        count: action.payload.count,
        salesReport: action.payload.data
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
      state.page.salesReport = [];
    }
  }
});

export function useSalesReport() {

  const dispatch = useAppDispatch();

  return useMemo(() => ({

    getCurrent() {
      return useAppSelector(state => state.salesReport.current);
    },

    getPage() {
      return useAppSelector(state => state.salesReport.page);
    },

    async fetchCurrent() {
      const business = await BusinessUserApi.getBusiness();
      const salesReport = await BusinessApi.getCurrentSalesReport(business.id);
      dispatch(salesReportSlice.actions.setCurrent(salesReport));
    },

    async fetchPage(index: number, size: number) {

      try {

        dispatch(salesReportSlice.actions.setPageLoading());
        const page = await BusinessUserApi.getSalesReports(index, size);
        dispatch(salesReportSlice.actions.setPage(page));
        
      } catch {
        
        dispatch(salesReportSlice.actions.setPageError({ index, size }));
      }
    }
  }), []);
}
