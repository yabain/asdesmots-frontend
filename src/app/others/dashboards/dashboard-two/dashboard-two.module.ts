import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTwoRoutingModule } from './dashboard-two-routing.module';
import { DashboardTwoComponent } from './dashboard-two.component';


@NgModule({
  declarations: [
    DashboardTwoComponent
  ],
  imports: [
    CommonModule,
    DashboardTwoRoutingModule
  ]
})
export class DashboardTwoModule { }
