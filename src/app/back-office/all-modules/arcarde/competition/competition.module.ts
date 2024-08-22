import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { NgBmisDateTimePickerModule } from 'src/app/shared/elements/ng-bmis-date-time-picker/ng-bmis-date-time-picker.module';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { CompetitionRoutingModule } from './competition-routing.module';
import { GetParentNamePipe } from './pipe/get-parent-name.pipe';
import { CompetitionItemComponent } from './competititon-list/competition-item/competition-item.component';
import { SubCompetitionComponent } from './competititon-list/sub-competition/sub-competition.component';
import { CompetitionlistComponent } from './competititon-list/competition-list.component';
import { ListCretariasComponent } from './game-criteria/list-cretarias/list-cretarias.component';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { FormatDatePipe } from '../services/format-date.pipe';
import { ArcadeSubscribeFormComponent } from '../subscribers/arcade-subscribe-form/arcade-subscribe-form.component';
import { ArcadeSuscribersComponent } from '../subscribers/arcade-suscribers/arcade-suscribers.component';
import { UnsubscribeModalComponent } from '../subscribers/unsubscribe-modal/unsubscribe-modal.component';
import { ApplyCiteriaModalComponent } from './game-criteria/apply-citeria-modal/apply-citeria-modal.component';
import { DeleteCriteriaComponent } from './game-criteria/delete-criteria/delete-criteria.component';
import { DeletePartModalComponent } from './gane-parts/delete-part-modal/delete-part-modal.component';
import { CreatePartModalComponent } from './gane-parts/create-part-modal/create-part-modal.component';
import { ListPartsComponent } from './gane-parts/list-parts/list-parts.component';
import { SharedModule } from 'src/app/back-office/shared/shared.module';

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
    UnsubscribeModalComponent,
    ApplyCiteriaModalComponent,
    DeleteCriteriaComponent,
    DeletePartModalComponent,
    CreatePartModalComponent
  ],
  imports: [
    CompetitionRoutingModule,
    CommonModule,
    TranslateModule,
    ProgressIndeterminateModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgBmisDateTimePickerModule,
    SharedModule,
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
