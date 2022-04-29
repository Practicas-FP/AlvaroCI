import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoriesPage } from './stories.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesPageRoutingModule {}
