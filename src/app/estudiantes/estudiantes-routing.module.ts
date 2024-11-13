import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiantesPage } from './estudiantes.page';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiantesPageRoutingModule {}
