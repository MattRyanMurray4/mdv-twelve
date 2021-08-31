import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Toy } from '@toys/api-interfaces';

import * as ToysActions from './toys.actions';

export const TOYS_FEATURE_KEY = 'toys';

export interface ToysAction extends Action {
  error: string;
}

export interface ToysState extends EntityState<Toy> {
  selectedId?: string | number; // which Toys record has been selected
  loaded: boolean; // has the Toys list been loaded
  error?: string | null; // last known error (if any)
}

export interface ToysPartialState {
  readonly [TOYS_FEATURE_KEY]: ToysState;
}

export const toysAdapter: EntityAdapter<Toy> = createEntityAdapter<Toy>();

export const initialState: ToysState = toysAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: ToysState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: ToysState, { error }: ToysAction) => ({
  ...state,
  error,
});

const _toysReducer = createReducer(
  initialState,
  on(
    ToysActions.loadToy,
    ToysActions.loadToys,
    ToysActions.createToy,
    ToysActions.updateToy,
    ToysActions.deleteToy,
    setLoading
  ),
  on(
    ToysActions.loadToyFailure,
    ToysActions.loadToysFailure,
    ToysActions.createToyFailure,
    ToysActions.updateToyFailure,
    ToysActions.deleteToyFailure,
    setFailure
  ),
  on(ToysActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ToysActions.loadToysSuccess, (state, { toys }) =>
    toysAdapter.setAll(toys, { ...state, loaded: true })
  ),
  on(ToysActions.loadToysFailure, (state, { error }) => ({ ...state, error })),
  on(ToysActions.selectToy, (state, { toyId }) => ({
    selectedId: toyId,
    ...state,
  })),
  on(ToysActions.createToySuccess, (state, { toy }) =>
    toysAdapter.addOne(toy, { ...state, loaded: true })
  ),
  on(ToysActions.updateToySuccess, (state, { toy: { id, ...restToy } }) =>
    toysAdapter.updateOne(
      { id, changes: { ...restToy } },
      { ...state, loaded: true }
    )
  ),
  on(ToysActions.deleteToySuccess, (state, { id }) =>
    toysAdapter.removeOne(id, { ...state, loaded: true })
  ),
  on(ToysActions.loadToySuccess, (state, { toy }) =>
    toysAdapter.upsertOne(toy, { ...state, loaded: true })
  )
);

export function toysReducer(state: ToysState | undefined, action: Action) {
  return _toysReducer(state, action);
}
