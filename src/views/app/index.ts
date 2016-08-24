import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SwipeableCardModule } from 'ng2-swipeable-card';

import { AppComponent } from './app';
import { MODAL_DIRECTIVES } from '../../components/modal';
import { STORE_PROVIDERS } from '../../core/store';

@NgModule({
  imports: [CommonModule],
  declarations: [MODAL_DIRECTIVES],
  exports: [CommonModule, MODAL_DIRECTIVES]
})
export class SharedModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    SharedModule,
    SwipeableCardModule
  ],
  // declarations tells angular that `App` belongs to `AppModule`
  declarations: [
    AppComponent
  ],
  providers: [
    STORE_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
