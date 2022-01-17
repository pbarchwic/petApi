import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import * as Components from './components/index';
import * as Repositories from './repository/index';

@NgModule({
  declarations: [
    Components.PetFormComponent,
    Components.PetsListComponent,
    AppComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [Repositories.PetRepository],
  bootstrap: [AppComponent],
})
export class AppModule {}
