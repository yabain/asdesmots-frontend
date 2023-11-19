import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';
import { InvoiceCategoryComponent } from './invoice-category/invoice-category.component';


@NgModule({
  declarations: [
    ItemsComponent,
    InvoiceItemsComponent,
    InvoiceCategoryComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,ReactiveFormsModule,FormsModule,RouterModule
  ]
})
export class ItemsModule { }
