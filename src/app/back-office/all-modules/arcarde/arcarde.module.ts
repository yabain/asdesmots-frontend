import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcardeRoutingModule } from './arcarde-routing.module';
import { ArcardeComponent } from './arcarde.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from "../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserArcardeComponent } from './list-user-arcarde/list-user-arcarde.component';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';


@NgModule({
    declarations: [
        ArcardeComponent,
        ListUserArcardeComponent,
        ListArcardeComponent,
    ],
    imports: [
        CommonModule,
        ArcardeRoutingModule,
        TranslateModule,
        ProgressIndeterminateModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class ArcardeModule { }
