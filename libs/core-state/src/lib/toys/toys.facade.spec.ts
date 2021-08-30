import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ToysActions from './toys.actions';
import { ToysEffects } from './toys.effects';
import { ToysFacade } from './toys.facade';
import { ToysEntity } from './toys.models';
import { TOYS_FEATURE_KEY, State, initialState, reducer } from './toys.reducer';
import * as ToysSelectors from './toys.selectors';

interface TestSchema {
  toys: State;
}

describe('ToysFacade', () => {
  let facade: ToysFacade;
  let store: Store<TestSchema>;
  const createToysEntity = (id: string, name = ''): ToysEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TOYS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ToysEffects]),
        ],
        providers: [ToysFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ToysFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allToys$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allToys$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadToysSuccess` to manually update list
     */
    it('allToys$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allToys$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ToysActions.loadToysSuccess({
          toys: [createToysEntity('AAA'), createToysEntity('BBB')],
        })
      );

      list = await readFirst(facade.allToys$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
