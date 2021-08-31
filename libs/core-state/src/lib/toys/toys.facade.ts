import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Toy } from '@toys/api-interfaces';

import * as ToysActions from './toys.actions';

import * as ToysSelectors from './toys.selectors';

@Injectable()
export class ToysFacade {
  loaded$ = this.store.pipe(select(ToysSelectors.getToysLoaded));
  allToys$ = this.store.pipe(select(ToysSelectors.getAllToys));
  selectedToys$ = this.store.pipe(select(ToysSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(ToysActions.init());
  }

  loadToys() {
    return this.store.dispatch(ToysActions.loadToys());
  }

  selectToy(toyId: string) {
    return this.store.dispatch(ToysActions.selectToy({ toyId }));
  }

  createToy(toy: Toy) {
    return this.store.dispatch(ToysActions.createToy({ toy }));
  }

  updateToy(toy: Toy) {
    return this.store.dispatch(ToysActions.updateToy({ toy }));
  }

  deleteToy(toy: Toy) {
    return this.store.dispatch(ToysActions.deleteToy({ toy }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
