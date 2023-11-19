import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceItemsRoutingModule } from './invoice-items-routing.module';
import { InvoiceItemsComponent } from './invoice-items.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoiceItemsRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoiceItemsModule { }
