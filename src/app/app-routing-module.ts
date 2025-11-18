import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './core/home/home';
import {Crud} from './features/crud/crud';
import { Almacen } from './features/almacen/almacen';
import {DefinicionProyecto} from './features/definicion-p/definicion-p';
import { AreaLaboral } from './features/area-laboral/area-laboral';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'crud',
    component: Crud,
  },
  {
    path: 'crud/almacen',
    component: Almacen,
  },
  {
    path: 'definicion-proyecto',
    component: DefinicionProyecto,
  },
  {
    path: 'crud/area-laboral',
    component: AreaLaboral,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
