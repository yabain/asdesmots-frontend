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
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserDetailsModule } from '../../shared/user-details/user-details.module';

@NgModule({
    declarations: [CustomersComponent, CustomerListComponent, AddCustomerComponent, EditCustomerComponent],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        ModalModule.forRoot(),
        ProgressIndeterminateModule,
        TranslateModule,
        UserDetailsModule
    ]
})
export class CustomersModule {}
