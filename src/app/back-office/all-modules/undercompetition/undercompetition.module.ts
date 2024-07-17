import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UndercompetitionRoutingModule } from './undercompetition-routing.module';
import { UndercompetitionComponent } from './undercompetition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { ListCompetitionComponent } from './list-competition/list-competition.component';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { ListCretariasComponent } from './list-cretarias/list-cretarias.component';
import { GetParentNamePipe } from './list-competition/pipe/get-parent-name.pipe';
import { ListPartsComponent } from './list-parts/list-parts.component';
import { FormatDatePipe } from './list-competition/pipe/format-date.pipe';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UndercompetitionComponent,
    UpdateCompetitionComponent,
    ListCompetitionComponent,
    ListCretariasComponent,
    GetParentNamePipe,
    FormatDatePipe,
    ListPartsComponent,
    CreateCompetitionComponent
  ],
  imports: [
    CommonModule,
    UndercompetitionRoutingModule,
    TranslateModule,
    ProgressIndeterminateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class UndercompetitionModule { }
