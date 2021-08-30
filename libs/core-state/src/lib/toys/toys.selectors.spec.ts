import { ToysEntity } from './toys.models';
import { toysAdapter, ToysPartialState, initialState } from './toys.reducer';
import * as ToysSelectors from './toys.selectors';

describe('Toys Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getToysId = (it: ToysEntity) => it.id;
  const createToysEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ToysEntity);

  let state: ToysPartialState;

  beforeEach(() => {
    state = {
      toys: toysAdapter.setAll(
        [
          createToysEntity('PRODUCT-AAA'),
          createToysEntity('PRODUCT-BBB'),
          createToysEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Toys Selectors', () => {
    it('getAllToys() should return the list of Toys', () => {
      const results = ToysSelectors.getAllToys(state);
      const selId = getToysId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ToysSelectors.getSelected(state) as ToysEntity;
      const selId = getToysId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getToysLoaded() should return the current "loaded" status', () => {
      const result = ToysSelectors.getToysLoaded(state);

      expect(result).toBe(true);
    });

    it('getToysError() should return the current "error" state', () => {
      const result = ToysSelectors.getToysError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
