import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesDraftRoutingModule } from './invoices-draft-routing.module';
import { InvoicesDraftComponent } from './invoices-draft.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoicesDraftRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesDraftModule { }
