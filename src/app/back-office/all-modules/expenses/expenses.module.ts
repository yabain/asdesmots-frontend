import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { RouterModule } from '@angular/router';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,
    AddExpensesComponent,
    EditExpensesComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ExpensesModule { }
