import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCustomerComponent } from 'src/app/back-office/all-modules/customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customers-list/customer-list.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: "customers-list", component: CustomerListComponent },
      { path: "add-customer", component: AddCustomerComponent},
      { path: "edit-customer", component: EditCustomerComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
