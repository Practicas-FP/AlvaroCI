import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadPageRoutingModule } from './read-routing.module';

import { ReadPage } from './read.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [ReadPage]
})
export class ReadPageModule {}
