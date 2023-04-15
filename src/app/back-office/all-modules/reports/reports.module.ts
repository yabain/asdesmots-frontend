import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ExpensesreportComponent } from './expensesreport/expensesreport.component';
import { ProfitlossreportComponent } from './profitlossreport/profitlossreport.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { TaxsreportComponent } from './taxsreport/taxsreport.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ReportsComponent,
    ExpensesreportComponent,
    ProfitlossreportComponent,
    SalesreportComponent,
    TaxsreportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DataTablesModule
  ]
})
export class ReportsModule { }
