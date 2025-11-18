import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './core/home/home'; // 👈 ojo a esto

const routes: Routes = [
  {
    path: '',
    component: Home, // Ruta principal /
  },
  {
    path: 'crud',
    loadChildren: () =>
      import('./features/crud/crud').then(m => m.Crud)
  },
  {
    path: 'consultas',
    loadChildren: () =>
      import('./features/consultas/consultas').then(m => m.Consultas)
  },
  {
    path: '**',
    redirectTo: '', // Cualquier ruta desconocida → Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
