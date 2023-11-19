import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditExpensesRoutingModule } from './edit-expenses-routing.module';
import { EditExpensesComponent } from './edit-expenses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EditExpensesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditExpensesModule { }
