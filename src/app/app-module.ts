import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './core/home/home';
import { HttpClientModule } from '@angular/common/http';
import { Crud } from './features/crud/crud';
import { Almacen } from './features/almacen/almacen';
import { ReactiveFormsModule } from '@angular/forms';
import { DefinicionProyecto } from './features/definicion-p/definicion-p';
import { AreaLaboral } from './features/area-laboral/area-laboral';

@NgModule({
  declarations: [
    App,
    Home,
    Almacen,
    Crud,
    DefinicionProyecto,
    AreaLaboral
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
