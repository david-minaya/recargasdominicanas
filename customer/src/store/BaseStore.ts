import { createSlice, Slice } from '@reduxjs/toolkit';
import { createDraft, finishDraft } from 'immer';
import { Draft, WritableDraft } from 'immer/dist/internal';
import { State, store, useAppSelector } from './store';

type Set<T> = {
  set(state: Draft<T>[], action: { payload: any, type: string }): any;
}

export abstract class BaseStore<T> {

  private slice: Slice<T[], Set<T>, string>;

  constructor(private stateKey: keyof State) {
    this.slice = createSlice({
      name: stateKey,
      initialState: [] as T[],
      reducers: {
        set: (state, action) => action.payload
      }
    });
  }

  reducer() {
    return this.slice.reducer;
  }

  reset() {
    this.dispatch(createDraft([]));
  }

  protected findAll<R>(selector: (state: T[]) => R): R {
    return useAppSelector<R>((state: any) => {
      return selector(state[this.stateKey]);
    });
  }

  protected findById<R>(id: number, selector: (state: T) => R): R | undefined {
    return useAppSelector<R>((state: any) => selector(state[this.stateKey].find((item: any) => item.id === id)));
  }

  protected set(data: T[]) {
    this.dispatch(createDraft(data));
  }

  protected add(id: number, data: Partial<T>) {
    const state = createDraft(this.getState());
    state.push({ id, ...data });
    this.dispatch(state);
  }

  protected update(id: number, data: Partial<T>) {
    const item = this.getStateById(id);
    if (item) {
      const state = createDraft(this.getState());
      const index = state.findIndex((item: any) => item.id === id);
      state[index] = finishDraft(createDraft({ ...item, ...data }));
      this.dispatch(state);
    }
  }

  protected upsert(id: number, data: Partial<T>) {
    if (!this.exists(id)) {
      this.add(id, data);
    } else {
      this.update(id, data);
    }
  }

  protected exists(id: number) {
    return this.getStateById(id) !== undefined;
  }

  private getStateById(id: number) {
    const state = this.getState();
    return state.find((item: any) => item.id === id);
  }

  private getState() {
    return store.getState()[this.stateKey] as any;
  }

  private dispatch(state: WritableDraft<any>) {
    store.dispatch(this.slice.actions.set(finishDraft(state)));
  }
}
