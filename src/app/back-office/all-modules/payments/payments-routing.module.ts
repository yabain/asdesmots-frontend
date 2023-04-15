import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPaymentsComponent } from './add-payments/add-payments.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {path:'',component:PaymentsComponent,
  children: [
    { path: "payments-list", component: PaymentsListComponent},
    { path: "add-payment", component: AddPaymentsComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
