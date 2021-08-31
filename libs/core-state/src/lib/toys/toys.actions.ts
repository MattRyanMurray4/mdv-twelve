import { createAction, props } from '@ngrx/store';
import { Toy } from '@toys/api-interfaces';

export const init = createAction('[Toys Page] Init');

// all

export const loadToys = createAction('[Toys] Load All Toys.');

export const loadToysSuccess = createAction(
  '[Toys] Load Toys Success.',
  props<{ toys: Toy[] }>()
);

export const loadToysFailure = createAction(
  '[Toys] Load Toys Failure.',
  props<{ error: any }>()
);

// load one

export const loadToy = createAction(
  '[Toy] Load A Toy.',
  props<{ id: string }>()
);
export const loadToySuccess = createAction(
  '[Toy] Loaded Toy Success.',
  props<{ toy: Toy }>()
);
export const loadToyFailure = createAction(
  '[Toy] Loaded Toy Failure.',
  props<{ error: any }>()
);

// select one

export const selectToy = createAction(
  '[Toy] Select A Toy.',
  props<{ toyId: string }>()
);

// create

export const createToy = createAction(
  '[Toy] Create A Toy.',
  props<{ toy: Toy }>()
);

export const createToySuccess = createAction(
  '[Toy] Created Toy Success.',
  props<{ toy: Toy }>()
);

export const createToyFailure = createAction(
  '[Toy] Created Toy Failure.',
  props<{ error: any }>()
);

// update

export const updateToy = createAction(
  '[Toy] Update A Toy.',
  props<{ toy: Toy }>()
);

export const updateToySuccess = createAction(
  '[Toy] Updated Toy Success.',
  props<{ toy: Toy }>()
);

export const updateToyFailure = createAction(
  '[Toy] Updated Toy Failure.',
  props<{ error: any }>()
);

// delete

export const deleteToy = createAction(
  '[Toy] Delete A Toy.',
  props<{ toy: Toy }>()
);

export const deleteToySuccess = createAction(
  '[Toy] Deleted Toy Success.',
  props<{ id: string }>()
);

export const deleteToyFailure = createAction(
  '[Toy] Deleted Toy Failure.',
  props<{ error: any }>()
);
