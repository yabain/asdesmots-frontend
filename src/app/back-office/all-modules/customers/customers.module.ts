import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customers-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [ CustomersComponent,CustomerListComponent,AddCustomerComponent,EditCustomerComponent],
  imports: [CommonModule, CustomersRoutingModule, RouterModule,ReactiveFormsModule,FormsModule,DataTablesModule],
})
export class CustomersModule {}
