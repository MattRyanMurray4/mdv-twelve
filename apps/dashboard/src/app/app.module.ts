import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToysComponent } from './toys/toys.component';
import { ToysListComponent } from './toys/toys-list/toys-list.component';
import { ToyDetailsComponent } from './toys/toy-details/toy-details.component';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@toys/material';
import { CoreDataModule } from '@toys/core-data';
import { CoreStateModule } from '@toys/core-state';
import { UiLibraryModule } from '@toys/ui-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToysComponent,
    ToysListComponent,
    ToyDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    UiLibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
