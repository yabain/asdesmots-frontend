import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCustomerRoutingModule } from './edit-customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EditCustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditCustomerModule { }
