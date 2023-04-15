import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddPaymentsComponent } from './add-payments/add-payments.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,
    AddPaymentsComponent

  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class PaymentsModule { }
