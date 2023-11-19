import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesRecurringRoutingModule } from './invoices-recurring-routing.module';
import { InvoicesRecurringComponent } from './invoices-recurring.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoicesRecurringRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesRecurringModule { }
