import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataTableComponent } from './admin-data-table.component';
import { AdminDataTableRoutingModule } from './admin-data-table-routing.module';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [ AdminDataTableComponent ],
  imports: [
    CommonModule,
    AdminDataTableRoutingModule,
    RouterModule,
    DataTablesModule
  ]
})
export class AdminDataTableModule { }
