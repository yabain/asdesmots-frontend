import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesListRoutingModule } from './expenses-list-routing.module';
import { ExpensesListComponent } from './expenses-list.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ExpensesListRoutingModule
  ]
})
export class ExpensesListModule { }
