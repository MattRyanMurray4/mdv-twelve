import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromToys from './toys/toys.reducer';
import { ToysEffects } from './toys/toys.effects';
import { ToysFacade } from './toys/toys.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromToys.TOYS_FEATURE_KEY, fromToys.reducer),
    EffectsModule.forFeature([ToysEffects]),
  ],
  providers: [ToysFacade],
})
export class CoreStateModule {}
