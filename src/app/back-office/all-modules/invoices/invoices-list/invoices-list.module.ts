import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesListRoutingModule } from './invoices-list-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InvoicesListRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesListModule { }
