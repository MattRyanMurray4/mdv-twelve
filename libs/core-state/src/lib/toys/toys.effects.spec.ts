import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ToysActions from './toys.actions';
import { ToysEffects } from './toys.effects';

describe('ToysEffects', () => {
  let actions: Observable<Action>;
  let effects: ToysEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ToysEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ToysEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ToysActions.init() });

      const expected = hot('-a-|', {
        a: ToysActions.loadToysSuccess({ toys: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
