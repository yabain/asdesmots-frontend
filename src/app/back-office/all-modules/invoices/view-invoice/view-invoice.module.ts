import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInvoiceComponent } from './view-invoice.component';
import { ViewInvoiceRoutingModule } from './view-invoice-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    ViewInvoiceRoutingModule,
    RouterModule
  ]
})
export class ViewInvoiceModule { }
