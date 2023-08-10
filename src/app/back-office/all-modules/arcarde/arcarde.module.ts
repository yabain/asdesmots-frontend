import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcardeRoutingModule } from './arcarde-routing.module';
import { ArcardeComponent } from './arcarde.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from "../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserArcardeComponent } from './list-user-arcarde/list-user-arcarde.component';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { ArcadesuscriptionComponent } from './arcadesuscription/arcadesuscription.component';
import { FormatDatePipe } from './services/format-date.pipe';
import { CreateArcardeComponent } from './create-arcarde/create-arcarde.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    declarations: [
        ArcardeComponent,
        ListUserArcardeComponent,
        ListArcardeComponent,
        ArcadesuscriptionComponent,
        FormatDatePipe,
        CreateArcardeComponent
    ],
    imports: [
        CommonModule,
        ArcardeRoutingModule,
        TranslateModule,
        ProgressIndeterminateModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ]
})
export class ArcardeModule { }
