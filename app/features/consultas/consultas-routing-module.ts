import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Consultas } from './consultas';

const routes: Routes = [{ path: '', component: Consultas }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
