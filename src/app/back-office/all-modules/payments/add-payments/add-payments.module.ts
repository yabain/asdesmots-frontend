import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentsComponent } from './add-payments.component';
import { AddPaymentsRoutingModule } from './add-payments-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    AddPaymentsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddPaymentsModule { }
