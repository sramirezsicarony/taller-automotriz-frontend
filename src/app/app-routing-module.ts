import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './core/home/home';
import {Crud} from './features/crud/crud';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {path: 'crud', component: Crud},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
