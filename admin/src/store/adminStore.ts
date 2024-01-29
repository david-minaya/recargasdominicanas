import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdmin } from '@recargas-dominicanas/core/types';
import { AdminApi } from '@recargas-dominicanas/core/api';
import { useAppSelector, store } from './store';

const slice = createSlice({
  name: 'admin',
  initialState: {} as IAdmin,
  reducers: {
    set(state, action: PayloadAction<IAdmin>) {
      return action.payload;
    }
  }
});

export class AdminStore {

  static reducer() {
    return slice.reducer;
  }

  static get() {
    return useAppSelector(state => state.admin);
  }

  static async fetch() {
    const admin = await AdminApi.getAdmin();
    store.dispatch(slice.actions.set(admin));
  }
}
