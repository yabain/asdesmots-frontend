import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceCategoryRoutingModule } from './invoice-category-routing.module';
import { InvoiceCategoryComponent } from './invoice-category.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InvoiceCategoryRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class InvoiceCategoryModule { }
