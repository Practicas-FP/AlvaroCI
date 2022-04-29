import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatorsPageRoutingModule } from './creators-routing.module';

import { CreatorsPage } from './creators.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatorsPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [CreatorsPage]
})
export class CreatorsPageModule {}
