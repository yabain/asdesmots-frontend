import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesCancelledRoutingModule } from './invoices-cancelled-routing.module';
import { InvoicesCancelledComponent } from './invoices-cancelled.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoicesCancelledRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesCancelledModule { }
