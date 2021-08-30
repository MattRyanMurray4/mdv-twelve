import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToysComponent } from './toys/toys.component';
import { ToysListComponent } from './toys/toys-list/toys-list.component';
import { ToyDetailsComponent } from './toys/toy-details/toy-details.component';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ToysComponent, ToysListComponent, ToyDetailsComponent],
  imports: [BrowserModule, HttpClientModule, RoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
