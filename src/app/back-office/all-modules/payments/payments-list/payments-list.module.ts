import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsListRoutingModule } from './payments-list-routing.module';
import { PaymentsListComponent } from './payments-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PaymentsListRoutingModule
  ]
})
export class PaymentsListModule { }
