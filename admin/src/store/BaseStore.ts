import { createSlice, Slice } from '@reduxjs/toolkit';
import { createDraft, finishDraft } from 'immer';
import { Draft, WritableDraft } from 'immer/dist/internal';
import { State, store, useAppSelector } from './store';

type Set<T> = {
  set(state: Draft<T>[], action: { payload: any, type: string }): any;
}

export abstract class BaseStore<T> {

  private slice: Slice<Partial<T>[], Set<Partial<T>>, string>;

  constructor(private stateKey: keyof State, initialState: Partial<T>[] = []) {
    this.slice = createSlice({
      name: stateKey as string,
      initialState: initialState,
      reducers: {
        set: (state, action) => action.payload
      }
    });
  }

  reducer() {
    return this.slice.reducer;
  }

  protected findAll<K extends keyof T>(key: K) {
    return useAppSelector<T[]>((state: any) => state[this.stateKey]).map(item => item[key]);
  }

  protected findById<K extends keyof T>(id: number, key: K): T[K] {
    return useAppSelector<T[K]>((state: any) => {
      const item = state[this.stateKey].find((item: any) => item.id === id);
      return item?.[key];
    });
  }

  protected add<K extends keyof T>(key: K, data: any) {
    const state = createDraft(this.getState());
    state.push({ id: data.id, [key]: data });
    this.dispatch(state);
  }

  protected set(data: T[]) {
    this.dispatch(createDraft(data));
  }

  protected update<K extends keyof T>(id: number, itemPropKey: K, data: T[K]) {

    const state = this.getStateById(id);
    
    if (state) {
      state[itemPropKey] = data;
      this.store(state);
    }
  }

  protected upsert<K extends keyof T>(id: number, key: K, data: T[K]) {
    if (!this.exists(id)) {
      this.add(key, { ...data, id });
    } else {
      this.update(id, key, data);
    }
  }

  protected exists(id: number) {
    return this.getStateById(id) !== undefined;
  }

  private getStateById(id: number) {
    const state = this.getState();
    const item = state.find(item => item.id === id);
    return item ? createDraft(item) : undefined;
  }

  private store(item: WritableDraft<any>) {
    const state = createDraft(this.getState());
    const index = state.findIndex(_item => _item.id === item.id);
    state[index] = finishDraft(item);
    this.dispatch(state);
  }

  private getState(): any[] {
    return (store.getState() as any)[this.stateKey];
  }

  private dispatch(state: WritableDraft<any>) {
    store.dispatch(this.slice.actions.set(finishDraft(state)));
  }
}
