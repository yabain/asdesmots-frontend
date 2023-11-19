import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCustomerRoutingModule } from './edit-words-routing.module';
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
