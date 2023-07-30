import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFiveRoutingModule } from './dashboard-five-routing.module';
import { DashboardFiveComponent } from './dashboard-five.component';


@NgModule({
  declarations: [
    DashboardFiveComponent
  ],
  imports: [
    CommonModule,
    DashboardFiveRoutingModule
  ]
})
export class DashboardFiveModule { }
