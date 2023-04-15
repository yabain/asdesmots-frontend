import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewExpensesComponent } from './view-expenses.component';
import { ViewExpensesRoutingModule } from './view-expenses-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ViewExpensesComponent ],
  imports: [
    CommonModule,
    ViewExpensesRoutingModule,
    RouterModule
  ]
})
export class ExpensesModule { }
