import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ToysActions from './toys.actions';
import * as ToysFeature from './toys.reducer';

@Injectable()
export class ToysEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToysActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ToysActions.loadToysSuccess({ toys: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ToysActions.loadToysFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
