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
import { ProgressIndeterminateModule } from 'src/app/front-office/shared/progress-indeterminate/progress-indeterminate.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserDetailsModule } from "../../../front-office/sections/user-details/user-details.module";
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        UserDetailsModule
    ]
})
export class CustomersModule {}
