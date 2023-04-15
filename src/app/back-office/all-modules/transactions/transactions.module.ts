import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    RouterModule,
    DataTablesModule
  ]
})
export class TransactionsModule { }
