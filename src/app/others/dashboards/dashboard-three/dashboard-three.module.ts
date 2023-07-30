import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardThreeRoutingModule } from './dashboard-three-routing.module';
import { DashboardThreeComponent } from './dashboard-three.component';


@NgModule({
  declarations: [
    DashboardThreeComponent
  ],
  imports: [
    CommonModule,
    DashboardThreeRoutingModule
  ]
})
export class DashboardThreeModule { }
