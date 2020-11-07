import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearsecretosPage } from './crearsecretos.page';

const routes: Routes = [
  {
    path: '',
    component: CrearsecretosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearsecretosPageRoutingModule {}
