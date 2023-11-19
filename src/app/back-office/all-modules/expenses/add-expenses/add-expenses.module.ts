import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpensesComponent } from './add-expenses.component';
import { AddExpensesRoutingModule } from './add-expenses-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    AddExpensesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddExpensesModule { }
