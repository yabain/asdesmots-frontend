import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInvoiceRoutingModule } from './edit-invoice-routing.module';
import { EditInvoiceComponent } from './edit-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EditInvoiceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditInvoiceModule { }
