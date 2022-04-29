import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatorsPage } from './creators.page';

const routes: Routes = [
  {
    path: '',
    component: CreatorsPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatorsPageRoutingModule {}
