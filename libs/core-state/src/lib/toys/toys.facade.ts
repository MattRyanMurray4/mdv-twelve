import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ToysActions from './toys.actions';
import * as ToysFeature from './toys.reducer';
import * as ToysSelectors from './toys.selectors';

@Injectable()
export class ToysFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ToysSelectors.getToysLoaded));
  allToys$ = this.store.pipe(select(ToysSelectors.getAllToys));
  selectedToys$ = this.store.pipe(select(ToysSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ToysActions.init());
  }
}
