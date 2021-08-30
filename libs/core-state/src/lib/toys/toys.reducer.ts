import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ToysActions from './toys.actions';
import { ToysEntity } from './toys.models';

export const TOYS_FEATURE_KEY = 'toys';

export interface State extends EntityState<ToysEntity> {
  selectedId?: string | number; // which Toys record has been selected
  loaded: boolean; // has the Toys list been loaded
  error?: string | null; // last known error (if any)
}

export interface ToysPartialState {
  readonly [TOYS_FEATURE_KEY]: State;
}

export const toysAdapter: EntityAdapter<ToysEntity> =
  createEntityAdapter<ToysEntity>();

export const initialState: State = toysAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const toysReducer = createReducer(
  initialState,
  on(ToysActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ToysActions.loadToysSuccess, (state, { toys }) =>
    toysAdapter.setAll(toys, { ...state, loaded: true })
  ),
  on(ToysActions.loadToysFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return toysReducer(state, action);
}
