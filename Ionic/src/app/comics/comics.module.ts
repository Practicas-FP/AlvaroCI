import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicsPageRoutingModule } from './comics-routing.module';

import { ComicsPage } from './comics.page';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicsPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ComicsPage]
})
export class ComicsPageModule {}
