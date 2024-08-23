import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcardeRoutingModule } from './arcarde-routing.module';
import { ArcardeComponent } from './arcarde.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from "../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { CreateArcardeComponent } from './create-arcarde/create-arcarde.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../shared/shared.module';
import { NgBmisDateTimePickerModule } from 'src/app/shared/elements/ng-bmis-date-time-picker/ng-bmis-date-time-picker.module';
import { ArcadeDetailsComponent } from './arcade-details/arcade-details.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CompetitionModule } from './competition/competition.module';

@NgModule({
    declarations: [
        ArcardeComponent,
        ListArcardeComponent,
        CreateArcardeComponent,
        ArcadeDetailsComponent,
        DeleteModalComponent,
    ],
    imports: [
        CommonModule,
        ArcardeRoutingModule,
        TranslateModule,
        ProgressIndeterminateModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CompetitionModule,
        NgBmisDateTimePickerModule
    ]
})
export class ArcardeModule { }
