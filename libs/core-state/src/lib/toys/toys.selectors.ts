import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TOYS_FEATURE_KEY, State, toysAdapter } from './toys.reducer';

// Lookup the 'Toys' feature state managed by NgRx
export const getToysState = createFeatureSelector<State>(TOYS_FEATURE_KEY);

const { selectAll, selectEntities } = toysAdapter.getSelectors();

export const getToysLoaded = createSelector(
  getToysState,
  (state: State) => state.loaded
);

export const getToysError = createSelector(
  getToysState,
  (state: State) => state.error
);

export const getAllToys = createSelector(getToysState, (state: State) =>
  selectAll(state)
);

export const getToysEntities = createSelector(getToysState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getToysState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getToysEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
