import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToysEffects } from './toys/toys.effects';
import { ToysFacade } from './toys/toys.facade';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([ToysEffects]),
    StoreDevtoolsModule.instrument({ name: 'Toys-App' }),
  ],
  providers: [ToysFacade],
})
export class CoreStateModule {}
