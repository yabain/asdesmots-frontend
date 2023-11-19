import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimatesListRoutingModule } from './estimates-list-routing.module';
import { EstimatesListComponent } from './estimates-list.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EstimatesListRoutingModule,
    DataTablesModule
  ]
})
export class EstimatesListModule { }
