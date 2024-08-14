import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArcardeRoutingModule } from './arcarde-routing.module';
import { ArcardeComponent } from './arcarde.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from "../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { ArcadeSuscribersComponent } from './arcade-suscribers/arcade-suscribers.component';
import { FormatDatePipe } from './services/format-date.pipe';
import { CreateArcardeComponent } from './create-arcarde/create-arcarde.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../shared/shared.module';
import { NgBmisDateTimePickerModule } from 'src/app/shared/elements/ng-bmis-date-time-picker/ng-bmis-date-time-picker.module';
import { ArcadeDetailsComponent } from './arcade-details/arcade-details.component';
import { CompetititonComponent } from './competititon/competititon.component';
import { SubCompetitionComponent } from './competititon/sub-competition/sub-competition.component';
import { CompetitionItemComponent } from './competititon/competition-item/competition-item.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UndercompetitionModule } from '../undercompetition/undercompetition.module';
import { ArcadeSubscribeFormComponent } from './arcade-subscribe-form/arcade-subscribe-form.component';
import { CompetitionDetailsComponent } from '../undercompetition/competition-details/competition-details.component';

@NgModule({
    declarations: [
        ArcardeComponent,
        ListArcardeComponent,
        ArcadeSuscribersComponent,
        FormatDatePipe,
        CreateArcardeComponent,
        ArcadeDetailsComponent,
        CompetititonComponent,
        SubCompetitionComponent,
        CompetitionItemComponent,
        DeleteModalComponent,
        ArcadeSubscribeFormComponent,
        CompetitionDetailsComponent,
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
        UndercompetitionModule,
        NgBmisDateTimePickerModule
    ]
})
export class ArcardeModule { }
