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
import { ArcadeSubscribeFormComponent } from '../subscribers/arcade-subscribe-form/arcade-subscribe-form.component';
import { ArcadeSuscribersComponent } from '../subscribers/arcade-suscribers/arcade-suscribers.component';
import { UnsubscribeModalComponent } from '../subscribers/unsubscribe-modal/unsubscribe-modal.component';
import { ApplyCiteriaModalComponent } from './game-criteria/apply-citeria-modal/apply-citeria-modal.component';
import { DeleteCriteriaComponent } from './game-criteria/delete-criteria/delete-criteria.component';
import { DeletePartModalComponent } from './gane-parts/delete-part-modal/delete-part-modal.component';
import { CreatePartModalComponent } from './gane-parts/create-part-modal/create-part-modal.component';
import { ListPartsComponent } from './gane-parts/list-parts/list-parts.component';
import { SharedModule } from 'src/app/back-office/shared/shared.module';
import { ArcadeListPlaceholderComponent } from '../list-arcarde/arcade-list-placeholder/arcade-list-placeholder.component';
import { PartDetailsModalComponent } from './gane-parts/part-details-modal/part-details-modal.component';
import { CompetitonTreeComponent } from './competiton-tree/competiton-tree.component';

@NgModule({
  declarations: [
    CreateCompetitionComponent,
    CompetitionDetailsComponent,
    UpdateCompetitionComponent,
    GetParentNamePipe,
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
    CreatePartModalComponent,
    ArcadeListPlaceholderComponent,
    PartDetailsModalComponent,
    CompetitonTreeComponent,
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
    ArcadeSuscribersComponent,
    ArcadeSubscribeFormComponent,
    UnsubscribeModalComponent,
    ArcadeListPlaceholderComponent,
    CompetitonTreeComponent
  ],
})
export class CompetitionModule {}
