import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/front-office/shared/shared.module';
import { NgBmisDateTimePickerModule } from 'src/app/shared/elements/ng-bmis-date-time-picker/ng-bmis-date-time-picker.module';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { GetParentNamePipe } from './pipe/get-parent-name.pipe';
import { CompetitionItemComponent } from './competititon-list/competition-item/competition-item.component';
import { SubCompetitionComponent } from './competititon-list/sub-competition/sub-competition.component';
import { CompetitionlistComponent } from './competititon-list/competition-list.component';
import { ListCretariasComponent } from './list-cretarias/list-cretarias.component';
import { ListPartsComponent } from './list-parts/list-parts.component';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { FormatDatePipe } from '../services/format-date.pipe';
import { ArcadeSubscribeFormComponent } from '../subscribers/arcade-subscribe-form/arcade-subscribe-form.component';
import { ArcadeSuscribersComponent } from '../subscribers/arcade-suscribers/arcade-suscribers.component';
import { UnsubscribeModalComponent } from '../subscribers/unsubscribe-modal/unsubscribe-modal.component';

@NgModule({
  declarations: [
    CreateCompetitionComponent,
    CompetitionDetailsComponent,
    UpdateCompetitionComponent,
    GetParentNamePipe,
    FormatDatePipe,
    DeleteModalComponent,
    CompetitionlistComponent,
    SubCompetitionComponent,
    CompetitionItemComponent,
    ListPartsComponent,
    ListCretariasComponent,
    ArcadeSuscribersComponent,
    ArcadeSubscribeFormComponent,
    UnsubscribeModalComponent
  ],
  imports: [
    CompetitionRoutingModule,
    CommonModule,
    TranslateModule,
    ProgressIndeterminateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
    NgBmisDateTimePickerModule,
  ],
  exports: [
    CompetitionlistComponent,
    DeleteModalComponent,
    FormatDatePipe,
    ArcadeSuscribersComponent,
    ArcadeSubscribeFormComponent,
    UnsubscribeModalComponent
  ],
})
export class CompetitionModule {}
