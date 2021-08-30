import { Action } from '@ngrx/store';

import * as ToysActions from './toys.actions';
import { ToysEntity } from './toys.models';
import { State, initialState, reducer } from './toys.reducer';

describe('Toys Reducer', () => {
  const createToysEntity = (id: string, name = ''): ToysEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Toys actions', () => {
    it('loadToysSuccess should return the list of known Toys', () => {
      const toys = [
        createToysEntity('PRODUCT-AAA'),
        createToysEntity('PRODUCT-zzz'),
      ];
      const action = ToysActions.loadToysSuccess({ toys });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
