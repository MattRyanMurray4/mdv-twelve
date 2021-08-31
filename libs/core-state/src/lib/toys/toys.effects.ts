import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  getActionType,
  NotifyService,
  ToysService,
} from '@toys/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Toy } from '@toys/api-interfaces';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import {
  loadToy,
  loadToyFailure,
  loadToySuccess,
  loadToys,
  loadToysFailure,
  loadToysSuccess,
  createToy,
  createToyFailure,
  createToySuccess,
  updateToy,
  updateToyFailure,
  updateToySuccess,
  deleteToy,
  deleteToyFailure,
  deleteToySuccess,
} from './toys.actions';
import { of } from 'rxjs';

@Injectable()
export class ToysEffects {
  loadToys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadToys),
      switchMap(() =>
        this.toysService.all().pipe(
          map((toys) => loadToysSuccess({ toys })),
          catchError((error) => of(loadToysFailure({ error })))
        )
      )
    )
  );

  loadToy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadToy),
      switchMap(({ id }) =>
        this.toysService.find(id).pipe(
          map((toy) => loadToySuccess({ toy })),
          catchError((error) => of(loadToyFailure({ error })))
        )
      )
    )
  );

  createToy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createToy),
      switchMap(({ toy }) =>
        this.toysService.create(toy).pipe(
          map((toy) => createToySuccess({ toy })),
          catchError((error) => of(createToyFailure({ error })))
        )
      )
    )
  );

  updateToy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateToy),
      switchMap(({ toy }) =>
        this.toysService.update(toy).pipe(
          map((toy) => updateToySuccess({ toy })),
          catchError((error) => of(updateToyFailure({ error })))
        )
      )
    )
  );

  deleteToy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteToy),
      switchMap(({ toy }) =>
        this.toysService.delete(toy.id).pipe(
          map((id) => deleteToySuccess({ id })),
          catchError((error) => of(deleteToyFailure({ error })))
        )
      )
    )
  );

  toysSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateToySuccess, createToySuccess, deleteToySuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Toy ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  toysFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateToyFailure, createToyFailure, deleteToyFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Toy. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private toysService: ToysService,
    private notify: NotifyService
  ) {}
}
