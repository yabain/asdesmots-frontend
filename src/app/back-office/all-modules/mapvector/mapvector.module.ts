import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapvectorRoutingModule } from './mapvector-routing.module';
import { MapvectorComponent } from './mapvector.component';


@NgModule({
  declarations: [
    MapvectorComponent
  ],
  imports: [
    CommonModule,
    MapvectorRoutingModule
  ]
})
export class MapvectorModule { }
