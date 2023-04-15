import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFourRoutingModule } from './dashboard-four-routing.module';
import { DashboardFourComponent } from './dashboard-four.component';


@NgModule({
  declarations: [
    DashboardFourComponent
  ],
  imports: [
    CommonModule,
    DashboardFourRoutingModule
  ]
})
export class DashboardFourModule { }
