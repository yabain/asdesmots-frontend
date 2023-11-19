import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesOverdueRoutingModule } from './invoices-overdue-routing.module';
import { InvoicesOverdueComponent } from './invoices-overdue.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoicesOverdueRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoicesOverdueModule { }
