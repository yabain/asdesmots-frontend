import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesPaidRoutingModule } from './invoices-paid-routing.module';
import { InvoicesPaidComponent } from './invoices-paid.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoicesPaidRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesPaidModule { }
