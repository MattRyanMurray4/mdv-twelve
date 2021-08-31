import { ActionReducerMap } from '@ngrx/store';
import { toysReducer, ToysState, TOYS_FEATURE_KEY } from './toys/toys.reducer';

export interface AppState {
  [TOYS_FEATURE_KEY]: ToysState;
}

export const reducers: ActionReducerMap<AppState> = {
  [TOYS_FEATURE_KEY]: toysReducer,
};
