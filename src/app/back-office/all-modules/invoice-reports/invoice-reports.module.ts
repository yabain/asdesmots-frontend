import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceReportsRoutingModule } from './invoice-reports-routing.module';
import { InvoiceReportsComponent } from './invoice-reports.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [InvoiceReportsComponent],
  imports: [
    CommonModule,
    InvoiceReportsRoutingModule,
    RouterModule,
    DataTablesModule
  ]
})
export class InvoiceReportsModule { }
