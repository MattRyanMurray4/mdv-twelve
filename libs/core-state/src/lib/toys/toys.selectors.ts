import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyToy, Toy } from '@toys/api-interfaces';
import { TOYS_FEATURE_KEY, ToysState, toysAdapter } from './toys.reducer';

export const getToysState = createFeatureSelector<ToysState>(TOYS_FEATURE_KEY);

const { selectAll, selectEntities } = toysAdapter.getSelectors();

export const getToysLoaded = createSelector(
  getToysState,
  (state: ToysState) => state.loaded
);

export const getToysError = createSelector(
  getToysState,
  (state: ToysState) => state.error
);

export const getAllToys = createSelector(getToysState, (state: ToysState) =>
  selectAll(state)
);

export const getToysEntities = createSelector(
  getToysState,
  (state: ToysState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getToysState,
  (state: ToysState) => state.selectedId
);

export const getSelected = createSelector(
  getToysEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyToy) as Toy
);
