import { createAction, props } from '@ngrx/store';
import { ToysEntity } from './toys.models';

export const init = createAction('[Toys Page] Init');

export const loadToysSuccess = createAction(
  '[Toys/API] Load Toys Success',
  props<{ toys: ToysEntity[] }>()
);

export const loadToysFailure = createAction(
  '[Toys/API] Load Toys Failure',
  props<{ error: any }>()
);
